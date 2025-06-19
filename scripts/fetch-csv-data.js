// Fetch and analyze the CSV data
async function fetchCSVData() {
  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/comprehensive%20list%20of%20pharaonic%20places%20in%20Egypt-h6VeQtto3NTIn2aibcmvv3X7Q0QGMO.csv",
    )
    const csvText = await response.text()

    console.log("CSV Data fetched successfully")
    console.log("First 500 characters:", csvText.substring(0, 500))

    // Parse CSV manually
    const lines = csvText.split("\n")
    const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))

    console.log("Headers:", headers)
    console.log("Total rows:", lines.length - 1)

    // Parse first few rows to understand structure
    const sampleData = []
    for (let i = 1; i <= Math.min(5, lines.length - 1); i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(",").map((v) => v.trim().replace(/"/g, ""))
        const row = {}
        headers.forEach((header, index) => {
          row[header] = values[index] || ""
        })
        sampleData.push(row)
      }
    }

    console.log("Sample data:", sampleData)

    return { headers, sampleData, totalRows: lines.length - 1 }
  } catch (error) {
    console.error("Error fetching CSV:", error)
  }
}

fetchCSVData()
