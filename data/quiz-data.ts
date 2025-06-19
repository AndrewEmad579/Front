import type { Quiz } from "@/types/quiz"

export const quizData: Quiz[] = [
  {
    id: "hieroglyphs-basics",
    title: "Hieroglyph Basics",
    description: "Test your knowledge of ancient Egyptian writing systems",
    category: "hieroglyphs",
    difficulty: "Easy",
    imageUrl:
      "https://www.britishmuseum.org/sites/default/files/styles/bm_gallery_medium_700h/public/2022-06/Hieroglyphs_unlocking_ancient_Egypt_hero.jpg?itok=CoQzKChb",
    questions: [
      {
        id: "h1",
        question:
          "What is the name of the ancient Egyptian writing system that uses symbols to represent sounds or ideas?",
        options: ["Cuneiform", "Hieroglyphs", "Pictograms", "Alphabets"],
        correctAnswer: 1,
      },
      {
        id: "h2",
        question: 'Which of the following is a common symbol in hieroglyphics used to represent the concept of "life"?',
        options: ["Ankh", "Djed", "Was Scepter", "Eye of Horus"],
        correctAnswer: 0,
      },
      {
        id: "h3",
        question: "In hieroglyphics, what does the direction of the symbols indicate?",
        options: [
          "The color of the object being depicted",
          "The gender of the person being referred to",
          "The direction in which the text should be read",
          "The time period when the text was written",
        ],
        correctAnswer: 2,
      },
      {
        id: "h4",
        question: "Which of the following is NOT a type of hieroglyphic symbol?",
        options: ["Ideogram", "Phonogram", "Logogram", "Numeral"],
        correctAnswer: 3,
      },
      {
        id: "h5",
        question:
          "The Rosetta Stone played a crucial role in deciphering hieroglyphics. What language was it written in alongside hieroglyphics?",
        options: ["Greek", "Latin", "Arabic", "Hebrew"],
        correctAnswer: 0,
      },
      {
        id: "h6",
        question: "How many basic types of hieroglyphic signs are there?",
        options: ["One", "Two", "Three", "Four"],
        correctAnswer: 2,
      },
      {
        id: "h7",
        question: 'In hieroglyphs, what do "determinatives" do?',
        options: [
          "Represent whole words",
          "Indicate how a word should be pronounced",
          "Show the category or meaning of a word",
          "Act as punctuation marks",
        ],
        correctAnswer: 2,
      },
      {
        id: "h8",
        question: "Which direction could hieroglyphs be written in?",
        options: [
          "Left to right only",
          "Right to left only",
          "Top to bottom only",
          "Any direction depending on space and design",
        ],
        correctAnswer: 3,
      },
      {
        id: "h9",
        question: "What does the hieroglyph of an open hand usually represent?",
        options: ["Power", "Work or action", "Peace", "Protection"],
        correctAnswer: 1,
      },
      {
        id: "h10",
        question: "Who was able to read and write hieroglyphs in ancient Egypt?",
        options: ["Everyone", "Farmers", "Priests and scribes", "Soldiers"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "pyramid-facts",
    title: "Pyramid Facts",
    description: "Challenge yourself with advanced knowledge about Egyptian pyramids",
    category: "pyramids",
    difficulty: "Hard",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/All_Gizah_Pyramids.jpg/1200px-All_Gizah_Pyramids.jpg",
    questions: [
      {
        id: "p1",
        question: "Which pyramid is the largest of the three pyramids at Giza?",
        options: ["Pyramid of Khafre", "Pyramid of Menkaure", "Great Pyramid of Khufu", "Bent Pyramid"],
        correctAnswer: 2,
      },
      {
        id: "p2",
        question: "What is the primary purpose of the pyramids built by the ancient Egyptians?",
        options: [
          "To serve as temples for worship",
          "To function as granaries for storing food",
          "To act as tombs for pharaohs",
          "To serve as astronomical observatories",
        ],
        correctAnswer: 2,
      },
      {
        id: "p3",
        question: "The Great Pyramid of Khufu is believed to have been constructed using which method?",
        options: [
          "Granite blocks floated on water",
          "Wooden ramps and levers",
          "Extraterrestrial technology",
          "Sandstone bricks molded on-site",
        ],
        correctAnswer: 1,
      },
      {
        id: "p4",
        question: "Which of the following is NOT one of the Seven Wonders of the Ancient World?",
        options: ["Pyramid of Khufu", "Hanging Gardens of Babylon", "Lighthouse of Alexandria", "Temple of Artemis"],
        correctAnswer: 0,
      },
      {
        id: "p5",
        question: "Approximately how many years ago was the Great Pyramid of Khufu constructed?",
        options: ["2,000 years ago", "4,000 years ago", "5,000 years ago", "6,000 years ago"],
        correctAnswer: 2,
      },
      {
        id: "p6",
        question: "What was the original height of the Great Pyramid of Giza when it was first completed?",
        options: ["138.8 meters", "146.6 meters", "152.5 meters", "160 meters"],
        correctAnswer: 1,
      },
      {
        id: "p7",
        question:
          'Which pyramid is known for having two different angles in its structure, giving it a "bent" appearance?',
        options: ["Great Pyramid of Khufu", "Pyramid of Djoser", "Bent Pyramid of Sneferu", "Red Pyramid"],
        correctAnswer: 2,
      },
      {
        id: "p8",
        question: 'What was the purpose of the "air shafts" found in the Great Pyramid of Khufu?',
        options: [
          "To allow ventilation for workers during construction",
          "To align with specific stars or constellations",
          "To help reduce internal pressure",
          "To serve as escape routes for priests",
        ],
        correctAnswer: 1,
      },
      {
        id: "p9",
        question:
          "Which of the following pyramids originally had a polished limestone casing that made it shine like a gem?",
        options: ["Pyramid of Menkaure", "Pyramid of Khafre", "Step Pyramid of Djoser", "Great Pyramid of Khufu"],
        correctAnswer: 3,
      },
      {
        id: "p10",
        question: "Which modern technology has been used to discover hidden chambers inside the Great Pyramid of Giza?",
        options: ["X-ray imaging", "MRI scanning", "Cosmic-ray muon radiography", "Ultrasound mapping"],
        correctAnswer: 2,
      },
      {
        id: "p11",
        question: "What material was primarily used to build the internal chambers of pyramids?",
        options: ["Granite", "Limestone blocks", "Mud bricks", "Basalt"],
        correctAnswer: 0,
      },
      {
        id: "p12",
        question:
          "The Pyramid Texts, the oldest religious writings in the world, were first inscribed inside pyramids during which dynasty?",
        options: ["3rd Dynasty", "4th Dynasty", "5th Dynasty", "6th Dynasty"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "daily-life",
    title: "Ancient Egyptian Daily Life",
    description: "Learn about the everyday lives of ancient Egyptians",
    category: "daily-life",
    difficulty: "Medium",
    imageUrl: "https://www.worldhistory.org/img/r/p/1500x1500/9326.jpg",
    questions: [
      {
        id: "d1",
        question: "What was the most common type of clothing worn by both men and women in ancient Egypt?",
        options: ["Tunics", "Robes", "Togas", "Saris"],
        correctAnswer: 0,
      },
      {
        id: "d2",
        question: "Which of the following animals was often kept as a pet in ancient Egyptian homes?",
        options: ["Lions", "Crocodiles", "Cats", "Elephants"],
        correctAnswer: 2,
      },
      {
        id: "d3",
        question: "What was a popular board game played by ancient Egyptians in their free time?",
        options: ["Chess", "Senet", "Backgammon", "Go"],
        correctAnswer: 1,
      },
      {
        id: "d4",
        question: "How did children typically learn a trade or profession in ancient Egypt?",
        options: [
          "By attending school",
          "By studying books",
          "By learning from family members or apprenticeships",
          "Through government training programs",
        ],
        correctAnswer: 2,
      },
      {
        id: "d5",
        question: "What was the main source of lighting inside homes at night?",
        options: ["Oil lamps", "Candles", "Fire pits", "Gas lanterns"],
        correctAnswer: 0,
      },
      {
        id: "d6",
        question: "Which of these was NOT a common job in ancient Egypt?",
        options: ["Farmer", "Scribe", "Teacher", "Blacksmith"],
        correctAnswer: 3,
      },
      {
        id: "d7",
        question: "How many days did a typical work week last in ancient Egypt?",
        options: ["5 days", "6 days", "7 days", "8 days"],
        correctAnswer: 1,
      },
      {
        id: "d8",
        question: "What was commonly used to sweeten food in ancient Egypt?",
        options: ["Sugar", "Honey", "Maple syrup", "Molasses"],
        correctAnswer: 1,
      },
      {
        id: "d9",
        question: "Which of these activities was commonly done during religious festivals in ancient Egypt?",
        options: ["Public feasting and processions", "Horse racing", "Wrestling matches", "Poetry competitions"],
        correctAnswer: 0,
      },
      {
        id: "d10",
        question: "What was a common way to preserve food in ancient Egypt due to the hot climate?",
        options: ["Freezing", "Salting and drying", "Pickling in vinegar", "Storing in iceboxes"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "gods-goddesses",
    title: "Gods & Goddesses",
    description: "Test your knowledge of Egyptian deities and mythology",
    category: "gods",
    difficulty: "Medium",
    imageUrl: "https://visitegypt.com/wp-content/uploads/2025/01/egyptian-gods-names-and-powers.webp",
    questions: [
      {
        id: "g1",
        question: "Which Egyptian god is associated with the afterlife and is depicted with green skin?",
        options: ["Ra", "Osiris", "Anubis", "Horus"],
        correctAnswer: 1,
      },
      {
        id: "g2",
        question: "Which goddess was considered the mother of all pharaohs?",
        options: ["Isis", "Hathor", "Bastet", "Sekhmet"],
        correctAnswer: 0,
      },
      {
        id: "g3",
        question: "Which god was depicted with the head of an ibis bird?",
        options: ["Thoth", "Set", "Ptah", "Khnum"],
        correctAnswer: 0,
      },
      {
        id: "g4",
        question: "Which deity was responsible for weighing the hearts of the deceased against the feather of Ma'at?",
        options: ["Osiris", "Anubis", "Thoth", "Horus"],
        correctAnswer: 1,
      },
      {
        id: "g5",
        question: "Which goddess represented truth, justice, and cosmic order?",
        options: ["Isis", "Nephthys", "Ma'at", "Nut"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "famous-pharaohs",
    title: "Famous Pharaohs",
    description: "Learn about Egypt's most notable rulers",
    category: "pharaohs",
    difficulty: "Medium",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/CairoEgMuseumTaaMaskMostlyPhotographed.jpg/1200px-CairoEgMuseumTaaMaskMostlyPhotographed.jpg",
    questions: [
      {
        id: "f1",
        question: "Which pharaoh is known for his golden funerary mask discovered in 1922?",
        options: ["Ramesses II", "Akhenaten", "Tutankhamun", "Khufu"],
        correctAnswer: 2,
      },
      {
        id: "f2",
        question: "Which female pharaoh ruled for over 20 years and expanded Egyptian trade networks?",
        options: ["Nefertiti", "Cleopatra", "Hatshepsut", "Tiye"],
        correctAnswer: 2,
      },
      {
        id: "f3",
        question: "Which pharaoh is known for building the most monuments throughout Egypt?",
        options: ["Amenhotep III", "Ramesses II", "Thutmose III", "Seti I"],
        correctAnswer: 1,
      },
      {
        id: "f4",
        question: "Which pharaoh attempted to change Egypt's religion to worship a single god?",
        options: ["Akhenaten", "Tutankhamun", "Horemheb", "Ay"],
        correctAnswer: 0,
      },
      {
        id: "f5",
        question: "Who was the last active pharaoh of ancient Egypt?",
        options: ["Ptolemy XIII", "Cleopatra VII", "Julius Caesar", "Mark Antony"],
        correctAnswer: 1,
      },
    ],
  },
]
