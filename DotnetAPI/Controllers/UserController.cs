using System.Security.Claims;
using Dapper;
using DotnetAPI.Data;
using DotnetAPI.Dtos;
using DotnetAPI.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DotnetAPI.Controllers
{
    public class UserProfileDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string UserRole { get; set; }
    }

    [ApiController]
    [Route("api/user")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly DataContextDapper _dapper;
        private readonly AuthHelper _authHelper;

        public UserController(DataContextDapper dapper, AuthHelper authHelper)
        {
            _dapper = dapper;
            _authHelper = authHelper;
        }

        [HttpGet("profile")]
        public IActionResult GetProfile()
        {
            try
            {
                string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User ID not found in token");
                }

                string sql = @"SELECT username, email, user_role as UserRole 
                             FROM Users 
                             WHERE user_id = @UserId";
                
                var user = _dapper.LoadDataSingle<UserProfileDto>(sql, new { UserId = userId });
                
                if (user == null)
                {
                    return NotFound("User not found");
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                // Log the exception details here
                return StatusCode(500, "An error occurred while fetching the user profile");
            }
        }

        // ... rest of your controller code ...
    }
} 