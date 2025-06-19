// REPLACE WITH THIS
export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center bg-gradient-to-b from-slate-900 to-black">
      <div className="flex flex-col items-center gap-4">
        {/* Re-using the themed SVG from your login/signup pages */}
        <div className="h-16 w-16">
          <svg
            viewBox="0 0 24 24"
            className="h-full w-full animate-spin text-[#FFD700]" // animate-spin makes it rotate
          >
            <path
              fill="currentColor"
              d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,3.18L19,6.3V11.22C19,12.92 18.5,14.65 17.65,16.17C16,14.94 13.26,14.5 12,14.5C10.74,14.5 8,14.94 6.35,16.17C5.5,14.65 5,12.92 5,11.22V6.3L12,3.18M12,6A3.5,3.5 0 0,0 8.5,9.5A3.5,3.5 0 0,0 12,13A3.5,3.5 0 0,0 15.5,9.5A3.5,3.5 0 0,0 12,6M12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8Z"
            />
          </svg>
        </div>
        <p className="text-muted-foreground">Loading your journey...</p>
      </div>
    </div>
  );
}