// Site data with image mappings
export interface SiteData {
  id: number
  name: string
  location: string
  keyFeatures: string
  distance?: string
  imageUrl?: string
  coordinates?: { lat: number; lng: number }
}

export const siteFallbackImages: Record<string, string> = {
  "Pyramids of Giza":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/All_Gizah_Pyramids.jpg/1200px-All_Gizah_Pyramids.jpg",
  "Temple of Karnak": "https://batnomad.com/wp-content/uploads/2017/12/P1040401-1024x641.jpg",
  "Valley of the Kings":
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/1a/9f/6c/valley-og-the-kings.jpg?w=900&h=500&s=1",
  "Abu Simbel Temples": "https://www.traveltoegypt.net/front/images/blog/AbuSimbel2.jpg",
  "Temple of Hatshepsut":
    "https://d3rr2gvhjw0wwy.cloudfront.net/uploads/activity_headers/324432/2000x2000-0-70-4880c7bbcc0821c699c954fd17286148.jpg",
  "Philae Temple":
    "https://egymonuments.gov.eg//media/2509/dsc_1871c.jpg?center=0.48299319727891155,0.52036199095022628&mode=crop&width=1200&height=630&rnd=133748558720000000",
  "Luxor Temple": "https://egyptescapes.com/wp-content/uploads/2022/04/luxortemple-1.jpg",
  "Medinet Habu":
    "https://historicaleve.com/wp-content/uploads/2024/02/The-Mortuary-Temple-of-Ramesses-III-at-Medinet-Habu-960x675.jpg",
  "Step Pyramid of Djoser":
    "https://www.thoughtco.com/thmb/LZHNVPqn3gh5etdJrMu_gNU_1JQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Djoser_Step_Pyramid-5683d9385f9b586a9e03e725.jpg",
  "Colossi of Memnon": "https://www.introducingegypt.com/f/egipto/egipto/guia/colosos-de-memnon.jpg",
  "Temple of Abydos": "https://bastettravel.com/wp-content/uploads/2024/05/Temple-of-Abydos.jpg",
  "Bent Pyramid":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Snefru%27s_Bent_Pyramid_in_Dahshur.jpg/1200px-Snefru%27s_Bent_Pyramid_in_Dahshur.jpg",
  "Red Pyramid": "https://www.traveltoegypt.net/front/images/blog/The-red-pyramid-of-Dahshur.jpg",
  "Temple of Esna": "https://nilecruisetrips.com/wp-content/uploads/2022/09/Esna-Temple-from-Luxor-1200x540.jpg",
  Ramesseum: "https://th.bing.com/th/id/R.bf31c6e06f65316de65e599d97ea5e0a?rik=cxYwBd10GGYGCA&riu=http%3a%2f%2fmegaconstrucciones.net%2fimages%2fmonumentos%2ffoto2%2framessseum.jpg&ehk=NBzyy1mzj3CjH8mFMOAeI5nzidNLSXN6tWvVDQiOhdE%3d&risl=&pid=ImgRaw&r=0",
  "Temple of Kalabsha": "https://nilecruisetrips.com/wp-content/uploads/2022/08/Temple-of-Kalabsha.jpg",
  "Pyramid of Meidum": "https://i.pinimg.com/736x/bd/b3/fd/bdb3fd41b6192510f3301f7fddfcc8b9.jpg",
  "Temple of Hibis": "https://www.arabcont.com/Images/ProjectImage/habees16.jpg",
}

// Function to parse CSV data
export function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === "," && !inQuotes) {
      result.push(current.trim())
      current = ""
    } else {
      current += char
    }
  }

  result.push(current.trim())
  return result
}

// Function to normalize site names for comparison
function normalizeSiteName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // Remove special characters
    .replace(/\s+/g, " ") // Normalize spaces
    .trim()
}

// Function to get predefined sites data
export function getPredefinedSites(): SiteData[] {
  return [
    {
      id: 1,
      name: "Pyramids of Giza",
      location: "Giza Governorate, Egypt",
      keyFeatures:
        "The Giza pyramid complex consists of the Great Pyramid of Giza, the Pyramid of Khafre, and the Pyramid of Menkaure, along with their associated pyramid complexes and the Great Sphinx of Giza. Built during the Fourth Dynasty of the Old Kingdom of ancient Egypt, these monuments are the oldest of the Seven Wonders of the Ancient World.",
      distance: "15 km from Cairo",
      imageUrl: siteFallbackImages["Pyramids of Giza"],
      coordinates: { lat: 29.9792, lng: 31.1342 },
    },
    {
      id: 2,
      name: "Temple of Karnak",
      location: "Luxor, Luxor Governorate, Egypt",
      keyFeatures:
        "The Karnak Temple Complex is a vast mix of decayed temples, chapels, pylons, and other buildings. It was built over more than 2,000 years by successive pharaohs, from Senusret I in the Middle Kingdom to the Ptolemaic Kingdom. The complex is dedicated primarily to the Theban triad of Amun, Mut, and Khonsu.",
      distance: "670 km from Cairo",
      imageUrl: siteFallbackImages["Temple of Karnak"],
      coordinates: { lat: 25.7188, lng: 32.6571 },
    },
    {
      id: 3,
      name: "Valley of the Kings",
      location: "Luxor, Luxor Governorate, Egypt",
      keyFeatures:
        "The Valley of the Kings is a valley in Egypt where, for a period of nearly 500 years from the 16th to 11th century BC, rock-cut tombs were excavated for the pharaohs and powerful nobles of the New Kingdom. The valley contains 63 tombs and chambers, including the famous tomb of Tutankhamun.",
      distance: "675 km from Cairo",
      imageUrl: siteFallbackImages["Valley of the Kings"],
      coordinates: { lat: 25.7402, lng: 32.6014 },
    },
    {
      id: 4,
      name: "Abu Simbel Temples",
      location: "Abu Simbel, Aswan Governorate, Egypt",
      keyFeatures:
        "Abu Simbel is an archaeological site comprising two massive rock-cut temples in southern Egypt. The twin temples were originally carved out of the mountainside in the 13th century BC, during the 19th Dynasty reign of Pharaoh Ramesses II. They were relocated in their entirety in 1968 to avoid submersion during the creation of Lake Nasser.",
      distance: "900 km from Cairo",
      imageUrl: siteFallbackImages["Abu Simbel Temples"],
      coordinates: { lat: 22.3372, lng: 31.6258 },
    },
    {
      id: 5,
      name: "Temple of Hatshepsut",
      location: "Deir el-Bahari, Luxor Governorate, Egypt",
      keyFeatures:
        "The Mortuary Temple of Hatshepsut is a mortuary temple built during the reign of Pharaoh Hatshepsut of the Eighteenth Dynasty of Egypt. Located opposite the city of Luxor, it is considered to be a masterpiece of ancient architecture. Its three massive terraces rise above the desert floor and into the cliffs of Deir el-Bahari.",
      distance: "680 km from Cairo",
      imageUrl: siteFallbackImages["Temple of Hatshepsut"],
      coordinates: { lat: 25.7379, lng: 32.6065 },
    },
    {
      id: 6,
      name: "Philae Temple",
      location: "Agilkia Island, Aswan Governorate, Egypt",
      keyFeatures:
        "Philae is an island in Lake Nasser, Egypt. It was the original location of an Ancient Egyptian temple complex in southern Egypt. The complex was dismantled and relocated to nearby Agilkia Island as part of the UNESCO Nubia Campaign project, protecting this and other complexes before the 1970 completion of the Aswan High Dam.",
      distance: "880 km from Cairo",
      imageUrl: siteFallbackImages["Philae Temple"],
      coordinates: { lat: 24.0256, lng: 32.8844 },
    },
    {
      id: 7,
      name: "Luxor Temple",
      location: "Luxor, Luxor Governorate, Egypt",
      keyFeatures:
        "Luxor Temple is a large Ancient Egyptian temple complex located on the east bank of the Nile River in the city today known as Luxor and was constructed approximately 1400 BCE. In the Egyptian language it was known as ipet resyt, 'the southern sanctuary'. It was built largely by Amenhotep III and Ramesses II.",
      distance: "670 km from Cairo",
      imageUrl: siteFallbackImages["Luxor Temple"],
      coordinates: { lat: 25.6989, lng: 32.6421 },
    },
    {
      id: 8,
      name: "Medinet Habu",
      location: "Luxor, Luxor Governorate, Egypt",
      keyFeatures:
        "Medinet Habu is the name commonly given to the Mortuary Temple of Ramesses III, an important New Kingdom period structure in the West Bank of Luxor in Egypt. Aside from its size and architectural and artistic importance, the temple is probably best known as the source of inscribed reliefs depicting the advent and defeat of the Sea Peoples during the reign of Ramesses III.",
      distance: "685 km from Cairo",
      imageUrl: siteFallbackImages["Medinet Habu"],
      coordinates: { lat: 25.72, lng: 32.6006 },
    },
    {
      id: 9,
      name: "Step Pyramid of Djoser",
      location: "Saqqara, Giza Governorate, Egypt",
      keyFeatures:
        "The Pyramid of Djoser, or Step Pyramid, is an archaeological site in the Saqqara necropolis, Egypt, northwest of the ruins of Memphis. It was built during the 27th century BC for the burial of Pharaoh Djoser by his architect, Imhotep. It is the earliest colossal stone building in Egypt and the earliest large-scale cut stone construction.",
      distance: "30 km from Cairo",
      imageUrl: siteFallbackImages["Step Pyramid of Djoser"],
      coordinates: { lat: 29.8713, lng: 31.2165 },
    },
    {
      id: 10,
      name: "Colossi of Memnon",
      location: "Luxor, Luxor Governorate, Egypt",
      keyFeatures:
        "The Colossi of Memnon are two massive stone statues of the Pharaoh Amenhotep III, who reigned in Egypt during the Eighteenth Dynasty of Egypt. Since 1350 BCE, they have stood in the Theban Necropolis, located west of the River Nile from the modern city of Luxor. The statues contain 107 Roman-era inscriptions in Greek and Latin.",
      distance: "680 km from Cairo",
      imageUrl: siteFallbackImages["Colossi of Memnon"],
      coordinates: { lat: 25.7211, lng: 32.6109 },
    },
    {
      id: 11,
      name: "Temple of Abydos",
      location: "Abydos, Sohag Governorate, Egypt",
      keyFeatures:
        "Abydos is one of the oldest cities of ancient Egypt, and also of the eighth nome in Upper Egypt. It is located about 11 kilometres west of the Nile at latitude 26° 10' N, near the modern Egyptian towns of el-'Araba el Madfuna and al-Balyana. The Temple of Seti I is the memorial temple of Seti I and is located in Abydos.",
      distance: "500 km from Cairo",
      imageUrl: siteFallbackImages["Temple of Abydos"],
      coordinates: { lat: 40.7128, lng: -74.0060 },
    },
    {
      id: 12,
      name: "Bent Pyramid",
      location: "Dahshur, Giza Governorate, Egypt",
      keyFeatures:
        "The Bent Pyramid is an ancient Egyptian pyramid located at the royal necropolis of Dahshur, approximately 40 kilometres south of Cairo, built under the Old Kingdom Pharaoh Sneferu. A unique example of early pyramid development in Egypt, this was the second pyramid built by Sneferu. The pyramid appears 'bent' because the angle of the pyramid changes from 54 degrees in the lower section to 43 degrees in the upper section.",
      distance: "40 km from Cairo",
      imageUrl: siteFallbackImages["Bent Pyramid"],
      coordinates: { lat: 29.7907, lng: 31.2096 },
    },
    {
      id: 13,
      name: "Red Pyramid",
      location: "Dahshur, Giza Governorate, Egypt",
      keyFeatures:
        "The Red Pyramid, also called the North Pyramid, is the largest of the pyramids located at the Dahshur necropolis in Cairo, Egypt. Named for the rusty reddish hue of its red limestone stones, it is also the third largest Egyptian pyramid, after those of Khufu and Khafre at Giza. It is also believed to be Egypt's first successful smooth-sided pyramid.",
      distance: "40 km from Cairo",
      imageUrl: siteFallbackImages["Red Pyramid"],
      coordinates: { lat: 29.8089, lng: 31.2067 },
    },
    {
      id: 14,
      name: "Temple of Esna",
      location: "Esna, Luxor Governorate, Egypt",
      keyFeatures:
        "The Temple of Esna is an Egyptian temple in the town of Esna, approximately 60 kilometres south of Luxor. The temple was constructed during the Ptolemaic and Roman periods. The temple is dedicated to the ram-headed god Khnum, along with a number of associated deities. The temple is notable for its astronomical ceiling and well-preserved hieroglyphic inscriptions.",
      distance: "700 km from Cairo",
      imageUrl: siteFallbackImages["Temple of Esna"],
      coordinates: { lat: 25.2919, lng: 32.5519 },
    },
    {
      id: 15,
      name: "Ramesseum",
      location: "Luxor, Luxor Governorate, Egypt",
      keyFeatures:
        "The Ramesseum is the memorial temple of Pharaoh Ramesses II. It is located in the Theban Necropolis in Upper Egypt, on the west of the River Nile, across from the modern city of Luxor. The name – or at least its French form Rhamesséion – was coined by Jean-François Champollion, who visited the ruins of the site in 1829 and first identified the hieroglyphs making up Ramesses's names and titles on the walls.",
      distance: "675 km from Cairo",
      imageUrl: siteFallbackImages["Ramesseum"],
      coordinates: { lat: 26.1874416, lng: 31.909604 },
    },
    {
      id: 16,
      name: "Temple of Kalabsha",
      location: "New Kalabsha, Aswan Governorate, Egypt",
      keyFeatures:
        "The Temple of Kalabsha is an ancient Egyptian temple that was originally located at Bab al-Kalabsha, approximately 50 km south of Aswan. The temple was dedicated to Mandulis, a Nubian solar deity. The temple was built around 30 BC during the early Roman era. Like other Nubian monuments, it was relocated in 1970 to New Kalabsha to save it from the rising waters of Lake Nasser.",
      distance: "885 km from Cairo",
      imageUrl: siteFallbackImages["Temple of Kalabsha"],
      coordinates: { lat: 23.9625, lng: 32.8794 },
    },
    {
      id: 17,
      name: "Pyramid of Meidum",
      location: "Meidum, Faiyum Governorate, Egypt",
      keyFeatures:
        "The Meidum pyramid was Egypt's first straight-sided pyramid, built for pharaoh Sneferu. Originally built as a step pyramid and then later converted to a true pyramid by filling in the steps with limestone encasing. The pyramid is thought to have collapsed during the Old Kingdom, after which it was abandoned. The pyramid is located approximately 100 km south of modern-day Cairo.",
      distance: "100 km from Cairo",
      imageUrl: siteFallbackImages["Pyramid of Meidum"],
      coordinates: { lat: 29.3881, lng: 31.1575 },
    },
    {
      id: 18,
      name: "Temple of Hibis",
      location: "Kharga Oasis, New Valley Governorate, Egypt",
      keyFeatures:
        "The Temple of Hibis is the largest and most well-preserved temple in the Kharga Oasis of Egypt's Western Desert. The temple was built in the 6th century BC during the Saite period and Persian occupation of Egypt. It is dedicated to the god Amun of Hibis. The temple represents a unique example of Persian period architecture in Egypt and contains important historical inscriptions.",
      distance: "600 km from Cairo",
      imageUrl: siteFallbackImages["Temple of Hibis"],
      coordinates: { lat: 25.4519, lng: 30.5342 },
    },
  ]
}

// Function to fetch and parse CSV data
export async function fetchSitesData(): Promise<SiteData[]> {
  return getPredefinedSites()
}

// Function to truncate description to 25-30 words
export function truncateDescription(text: string, wordLimit = 25): string {
  const words = text.split(" ")
  if (words.length <= wordLimit) return text
  return words.slice(0, wordLimit).join(" ") + "..."
}

// Function to save bookmark locally
export function saveBookmark(siteId: number): void {
  const bookmarks = getBookmarks()
  if (!bookmarks.includes(siteId)) {
    bookmarks.push(siteId)
    localStorage.setItem("site_bookmarks", JSON.stringify(bookmarks))
  }
}

// Function to remove bookmark
export function removeBookmark(siteId: number): void {
  const bookmarks = getBookmarks()
  const filtered = bookmarks.filter((id) => id !== siteId)
  localStorage.setItem("site_bookmarks", JSON.stringify(filtered))
}

// Function to get bookmarks
export function getBookmarks(): number[] {
  if (typeof window === "undefined") return []
  const bookmarks = localStorage.getItem("site_bookmarks")
  return bookmarks ? JSON.parse(bookmarks) : []
}

// Function to check if site is bookmarked
export function isBookmarked(siteId: number): boolean {
  return getBookmarks().includes(siteId)
}

// Function to share site
export function shareSite(site: SiteData): Promise<void> {
  return new Promise((resolve, reject) => {
    const shareData = {
      title: site.name,
      text: `Check out ${site.name} in ${site.location} - ${truncateDescription(site.keyFeatures, 15)}`,
      url: window.location.href,
    }

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator
        .share(shareData)
        .then(() => resolve())
        .catch((error) => reject(error))
    } else {
      // Fallback: copy to clipboard
      const shareText = `${site.name} - ${site.location}\n\n${site.keyFeatures}\n\nShared from AEGYPTUS app`

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(shareText)
          .then(() => {
            // Show success message
            const event = new CustomEvent("showToast", {
              detail: { message: "Site details copied to clipboard!" },
            })
            window.dispatchEvent(event)
            resolve()
          })
          .catch(() => reject(new Error("Failed to copy to clipboard")))
      } else {
        // Final fallback for older browsers
        try {
          const textArea = document.createElement("textarea")
          textArea.value = shareText
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand("copy")
          document.body.removeChild(textArea)

          const event = new CustomEvent("showToast", {
            detail: { message: "Site details copied to clipboard!" },
          })
          window.dispatchEvent(event)
          resolve()
        } catch (error) {
          reject(new Error("Unable to share or copy"))
        }
      }
    }
  })
}
