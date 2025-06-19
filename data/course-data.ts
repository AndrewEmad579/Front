import type { Course } from "@/types/course"

export const hieroglyphsCourse: Course = {
  id: "hieroglyphs-beginners",
  title: "Hieroglyphs for Beginners",
  description:
    "Learn to read and write basic hieroglyphs from ancient Egypt. Master the fundamentals of this fascinating writing system.",
  level: "Beginner",
  duration: "4 hours",
  totalLessons: 12,
  progress: 0,
  completed: false,
  imageUrl: "/placeholder.svg?height=200&width=300",
  lessons: [
    {
      id: "lesson-1",
      title: "Introduction to Hieroglyphs",
      description: "Discover the basics of ancient Egyptian writing system",
      duration: "15 min",
      videoUrl: "https://www.youtube.com/watch?v=WIjREbbFjNE",
      videoId: "WIjREbbFjNE",
      summary:
        "An introduction to the fascinating world of hieroglyphic writing, covering the history and basic principles of this ancient Egyptian script.",
      learningObjectives: [
        "Understand what hieroglyphs are and their historical significance",
        "Learn about the discovery and decipherment of hieroglyphs",
        "Recognize the three types of hieroglyphic signs",
      ],
      completed: false,
      quiz: {
        id: "quiz-1",
        questions: [
          {
            id: "q1-1",
            question: "What are the three main types of hieroglyphic signs?",
            type: "multiple-choice",
            options: [
              "Phonetic, Ideographic, Determinative",
              "Simple, Complex, Compound",
              "Sacred, Royal, Common",
              "Ancient, Middle, Modern",
            ],
            correctAnswer: 0,
            explanation:
              "Hieroglyphs consist of phonetic signs (sounds), ideographic signs (ideas/objects), and determinatives (clarify meaning).",
          },
          {
            id: "q1-2",
            question: "The Rosetta Stone was crucial for deciphering hieroglyphs.",
            type: "true-false",
            options: ["True", "False"],
            correctAnswer: 0,
            explanation:
              "The Rosetta Stone contained the same text in hieroglyphs, Demotic, and Greek, allowing scholars to decode hieroglyphs.",
          },
          {
            id: "q1-3",
            question: "Hieroglyphs were used only for religious purposes.",
            type: "true-false",
            options: ["True", "False"],
            correctAnswer: 1,
            explanation:
              "Hieroglyphs were used for various purposes including administrative records, literature, and personal correspondence.",
          },
        ],
      },
    },
    {
      id: "lesson-2",
      title: "Reading Direction and Basics",
      description: "Learn how to determine reading direction in hieroglyphic texts",
      duration: "18 min",
      videoUrl: "https://www.youtube.com/watch?v=g_TfXrMOkHY",
      videoId: "g_TfXrMOkHY",
      summary:
        "Master the fundamental rules for reading hieroglyphic texts, including direction, orientation, and basic reading principles.",
      learningObjectives: [
        "Determine the correct reading direction of hieroglyphic texts",
        "Understand how hieroglyphs face the beginning of the line",
        "Learn basic reading conventions and rules",
      ],
      completed: false,
      quiz: {
        id: "quiz-2",
        questions: [
          {
            id: "q2-1",
            question: "How do you determine the reading direction of hieroglyphs?",
            type: "multiple-choice",
            options: [
              "Always read left to right",
              "Look at which way the figures are facing",
              "Always read right to left",
              "Read from bottom to top",
            ],
            correctAnswer: 1,
            explanation:
              "Hieroglyphs are read towards the direction the figures are facing - they face the beginning of the line.",
          },
          {
            id: "q2-2",
            question: "Hieroglyphs can be written in multiple directions.",
            type: "true-false",
            options: ["True", "False"],
            correctAnswer: 0,
            explanation:
              "Hieroglyphs can be written left-to-right, right-to-left, or top-to-bottom depending on artistic and practical considerations.",
          },
        ],
      },
    },
    {
      id: "lesson-3",
      title: "Writing Your Name in Hieroglyphs",
      description: "Learn to write names using hieroglyphic symbols",
      duration: "20 min",
      videoUrl: "https://www.youtube.com/watch?v=emn_nqbETco",
      videoId: "emn_nqbETco",
      summary:
        "Discover how to transliterate modern names into hieroglyphic writing using phonetic signs and cartouches.",
      learningObjectives: [
        "Learn the concept of phonetic hieroglyphs",
        "Understand how to use cartouches for royal names",
        "Practice writing your own name in hieroglyphs",
      ],
      completed: false,
      quiz: {
        id: "quiz-3",
        questions: [
          {
            id: "q3-1",
            question: "What is a cartouche used for in hieroglyphic writing?",
            type: "multiple-choice",
            options: ["To separate sentences", "To enclose royal names", "To indicate questions", "To show emphasis"],
            correctAnswer: 1,
            explanation: "A cartouche is an oval enclosure that surrounds the hieroglyphs spelling out royal names.",
          },
          {
            id: "q3-2",
            question: "Modern names can be written in hieroglyphs using phonetic signs.",
            type: "true-false",
            options: ["True", "False"],
            correctAnswer: 0,
            explanation:
              "Yes, modern names can be transliterated into hieroglyphs using signs that represent similar sounds.",
          },
        ],
      },
    },
    {
      id: "lesson-4",
      title: "Grammar Fundamentals",
      description: "Basic grammar rules and sentence structure",
      duration: "25 min",
      videoUrl: "https://www.youtube.com/watch?v=LwZB0MsXCjQ",
      videoId: "LwZB0MsXCjQ",
      summary:
        "Learn the fundamental grammar rules of ancient Egyptian, including word order, pronouns, and basic sentence construction.",
      learningObjectives: [
        "Understand basic Egyptian word order (VSO)",
        "Learn common pronouns and their hieroglyphic forms",
        "Construct simple sentences in hieroglyphs",
      ],
      completed: false,
      quiz: {
        id: "quiz-4",
        questions: [
          {
            id: "q4-1",
            question: "What is the typical word order in ancient Egyptian?",
            type: "multiple-choice",
            options: [
              "Subject-Verb-Object (SVO)",
              "Verb-Subject-Object (VSO)",
              "Object-Verb-Subject (OVS)",
              "Subject-Object-Verb (SOV)",
            ],
            correctAnswer: 1,
            explanation:
              "Ancient Egyptian typically follows Verb-Subject-Object (VSO) word order, similar to modern Arabic.",
          },
          {
            id: "q4-2",
            question: "Determinatives help clarify the meaning of words.",
            type: "true-false",
            options: ["True", "False"],
            correctAnswer: 0,
            explanation: "Determinatives are unpronounced signs that help clarify the meaning and category of words.",
          },
        ],
      },
    },
    {
      id: "lesson-5",
      title: "Common Symbols and Meanings",
      description: "Learn frequently used hieroglyphic symbols",
      duration: "22 min",
      videoUrl: "https://www.youtube.com/watch?v=DCtg7CSxeCA",
      videoId: "DCtg7CSxeCA",
      summary:
        "Explore the most common hieroglyphic symbols, their meanings, and how they're used in various contexts.",
      learningObjectives: [
        "Recognize 20+ common hieroglyphic symbols",
        "Understand multiple meanings of symbols",
        "Learn symbol combinations and their significance",
      ],
      completed: false,
      quiz: {
        id: "quiz-5",
        questions: [
          {
            id: "q5-1",
            question: "The ankh symbol represents:",
            type: "multiple-choice",
            options: ["Death", "Life", "Power", "Wisdom"],
            correctAnswer: 1,
            explanation: "The ankh is the hieroglyphic symbol for 'life' and was considered a key to eternal life.",
          },
          {
            id: "q5-2",
            question: "A single hieroglyph can have multiple meanings depending on context.",
            type: "true-false",
            options: ["True", "False"],
            correctAnswer: 0,
            explanation:
              "Many hieroglyphs are polysemic, meaning they can represent different sounds or concepts depending on context.",
          },
        ],
      },
    },
    {
      id: "lesson-6",
      title: "Numbers and Counting",
      description: "Learn the hieroglyphic number system",
      duration: "15 min",
      videoUrl: "https://www.youtube.com/watch?v=g_TfXrMOkHY",
      videoId: "g_TfXrMOkHY",
      summary: "Master the ancient Egyptian number system and learn to read and write numbers in hieroglyphs.",
      learningObjectives: [
        "Understand the decimal-based Egyptian number system",
        "Learn symbols for 1, 10, 100, 1000, etc.",
        "Practice reading and writing numbers",
      ],
      completed: false,
      quiz: {
        id: "quiz-6",
        questions: [
          {
            id: "q6-1",
            question: "The ancient Egyptian number system was based on:",
            type: "multiple-choice",
            options: ["Base 12", "Base 10 (decimal)", "Base 20", "Base 60"],
            correctAnswer: 1,
            explanation: "The Egyptian number system was decimal (base 10), similar to our modern system.",
          },
        ],
      },
    },
    {
      id: "lesson-7",
      title: "Religious Symbols",
      description: "Explore hieroglyphs used in religious contexts",
      duration: "20 min",
      videoUrl: "https://www.youtube.com/watch?v=WIjREbbFjNE",
      videoId: "WIjREbbFjNE",
      summary: "Discover the sacred symbols and religious hieroglyphs used in temples, tombs, and religious texts.",
      learningObjectives: [
        "Identify major religious symbols",
        "Understand god names in hieroglyphs",
        "Learn about sacred and ritual contexts",
      ],
      completed: false,
    },
    {
      id: "lesson-8",
      title: "Daily Life Vocabulary",
      description: "Common words for everyday objects and activities",
      duration: "18 min",
      videoUrl: "https://www.youtube.com/watch?v=emn_nqbETco",
      videoId: "emn_nqbETco",
      summary: "Learn hieroglyphs for common objects, activities, and concepts from daily life in ancient Egypt.",
      learningObjectives: [
        "Learn vocabulary for food, clothing, and household items",
        "Understand family and social relationship terms",
        "Practice reading simple daily life texts",
      ],
      completed: false,
    },
    {
      id: "lesson-9",
      title: "Reading Simple Texts",
      description: "Practice reading basic hieroglyphic inscriptions",
      duration: "25 min",
      videoUrl: "https://www.youtube.com/watch?v=LwZB0MsXCjQ",
      videoId: "LwZB0MsXCjQ",
      summary: "Apply your knowledge to read actual hieroglyphic texts and inscriptions from ancient Egypt.",
      learningObjectives: [
        "Read simple tomb inscriptions",
        "Understand basic offering formulas",
        "Practice translation techniques",
      ],
      completed: false,
    },
    {
      id: "lesson-10",
      title: "Hieratic Script Introduction",
      description: "Learn about the cursive form of hieroglyphs",
      duration: "16 min",
      videoUrl: "https://www.youtube.com/watch?v=DCtg7CSxeCA",
      videoId: "DCtg7CSxeCA",
      summary:
        "Discover hieratic script, the cursive writing system derived from hieroglyphs used for everyday writing.",
      learningObjectives: [
        "Understand the relationship between hieroglyphs and hieratic",
        "Recognize basic hieratic forms",
        "Learn about different writing materials and contexts",
      ],
      completed: false,
    },
    {
      id: "lesson-11",
      title: "Historical Context",
      description: "The role of hieroglyphs in Egyptian civilization",
      duration: "20 min",
      videoUrl: "https://www.youtube.com/watch?v=g_TfXrMOkHY",
      videoId: "g_TfXrMOkHY",
      summary: "Explore how hieroglyphic writing evolved and its importance in ancient Egyptian society and culture.",
      learningObjectives: [
        "Understand the historical development of hieroglyphs",
        "Learn about scribal schools and education",
        "Explore the decline and rediscovery of hieroglyphs",
      ],
      completed: false,
    },
    {
      id: "lesson-12",
      title: "Final Project and Review",
      description: "Apply everything you've learned in a comprehensive project",
      duration: "30 min",
      videoUrl: "https://www.youtube.com/watch?v=WIjREbbFjNE",
      videoId: "WIjREbbFjNE",
      summary:
        "Complete a final project that demonstrates your understanding of hieroglyphic writing and review key concepts.",
      learningObjectives: [
        "Create your own hieroglyphic inscription",
        "Translate a provided text",
        "Demonstrate mastery of course concepts",
      ],
      completed: false,
    },
  ],
}

export const courseData: Course[] = [hieroglyphsCourse]
