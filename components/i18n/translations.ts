// Translations for the app
export const translations = {
  en: {
    // Common
    profile: "Profile",
    settings: "Settings",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    back: "Back",
    search: "Search",
    welcome: "Welcome",
    accountActions: "Account Actions",
    deleteAccountConfirmation: "Are you sure you want to delete your account? This action cannot be undone.",
    accountDeleted: "Account Deleted",
    accountDeletedDescription: "Your account has been successfully deleted.",

    // Navigation
    home: "Home",
    translate: "Translate",
    bazaar: "Bazaar",
    ar: "VR",
    sites: "Sites",

    // Profile page
    profileAndSettings: "Profile & Settings",
    editProfile: "Edit Profile",
    fullName: "Full Name",
    email: "Email",
    country: "Country",

    // General settings
    generalSettings: "General Settings",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    language: "Language",
    english: "English",
    arabic: "Arabic",

    // Notification preferences
    notificationPreferences: "Notification Preferences",
    appUpdates: "App Updates",
    bazaarOffers: "E-Bazaar Offers",
    culturalEvents: "Cultural Events",

    // Activity
    activity: "Activity",
    scanHistory: "Scan History",
    viewPastTranslations: "View past hieroglyph translations",
    purchaseHistory: "Purchase History",
    viewOrders: "View E-Bazaar orders",
    savedSites: "Saved Sites",
    bookmarkedLocations: "Bookmarked Pharaonic locations",

    // Security
    security: "Security",
    changePassword: "Change Password",
    updateCredentials: "Update your security credentials",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmNewPassword: "Confirm New Password",
    saveChanges: "Save Changes",

    // Account
    account: "Account",
    logOut: "Log Out",
    contactSupport: "Contact Support",
    getHelp: "Get help with the app",
    reportIssue: "Report Issue",
    reportProblem: "Report a problem with the app",
    deleteAccount: "Delete Account",

    // Bazaar
    addToCart: "Add to Cart",
    checkout: "Checkout",
    yourCart: "Your Cart",
    continueShopping: "Continue Shopping",

    // Translate
    camera: "Camera",
    text: "Text",
    from: "From",
    to: "To",

    // AR Experience
    experiences: "Experiences",
    artifacts: "Artifacts",
    monuments: "Monuments",

    // Sites
    nearbyLocations: "Nearby Locations",
    navigate: "Navigate",
    distance: "Distance",

    // Learn
    continueLearn: "Continue Learning",
    courses: "Courses",
    quizzes: "Quizzes",
    lessons: "lessons",
    duration: "duration",

    // Version
    version: "v1.0.0",
  },
  ar: {
    // Common
    profile: "الملف الشخصي",
    settings: "الإعدادات",
    save: "حفظ",
    cancel: "إلغاء",
    edit: "تعديل",
    delete: "حذف",
    back: "رجوع",
    search: "بحث",
    welcome: "مرحباً",
    accountActions: "إجراءات الحساب",
    deleteAccountConfirmation: "هل أنت متأكد من رغبتك في حذف حسابك؟ لا يمكن التراجع عن هذا الإجراء.",
    accountDeleted: "تم حذف الحساب",
    accountDeletedDescription: "تم حذف حسابك بنجاح.",

    // Navigation
    home: "الرئيسية",
    translate: "ترجمة",
    bazaar: "البازار",
    ar: "الواقع الافتراضي",
    sites: "المواقع",

    // Profile page
    profileAndSettings: "الملف الشخصي والإعدادات",
    editProfile: "تعديل الملف الشخصي",
    fullName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    country: "البلد",

    // General settings
    generalSettings: "الإعدادات العامة",
    theme: "المظهر",
    light: "فاتح",
    dark: "داكن",
    language: "اللغة",
    english: "الإنجليزية",
    arabic: "العربية",

    // Notification preferences
    notificationPreferences: "تفضيلات الإشعارات",
    appUpdates: "تحديثات التطبيق",
    bazaarOffers: "عروض البازار",
    culturalEvents: "الفعاليات الثقافية",

    // Activity
    activity: "النشاط",
    scanHistory: "سجل المسح",
    viewPastTranslations: "عرض الترجمات السابقة",
    purchaseHistory: "سجل المشتريات",
    viewOrders: "عرض الطلبات",
    savedSites: "المواقع المحفوظة",
    bookmarkedLocations: "المواقع المحفوظة",

    // Security
    security: "الأمان",
    changePassword: "تغيير كلمة المرور",
    updateCredentials: "تحديث بيانات الاعتماد",
    currentPassword: "كلمة المرور الحالية",
    newPassword: "كلمة المرور الجديدة",
    confirmNewPassword: "تأكيد كلمة المرور الجديدة",
    saveChanges: "حفظ التغييرات",

    // Account
    account: "الحساب",
    logOut: "تسجيل الخروج",
    contactSupport: "التواصل مع الدعم",
    getHelp: "الحصول على المساعدة",
    reportIssue: "الإبلاغ عن مشكلة",
    reportProblem: "الإبلاغ عن مشكلة في التطبيق",
    deleteAccount: "حذف الحساب",

    // Bazaar
    addToCart: "إضافة إلى السلة",
    checkout: "إتمام الشراء",
    yourCart: "سلة التسوق",
    continueShopping: "مواصلة التسوق",

    // Translate
    camera: "الكاميرا",
    text: "النص",
    from: "من",
    to: "إلى",

    // AR Experience
    experiences: "التجارب",
    artifacts: "القطع الأثرية",
    monuments: "المعالم",

    // Sites
    nearbyLocations: "المواقع القريبة",
    navigate: "التوجيه",
    distance: "المسافة",

    // Learn
    continueLearn: "مواصلة التعلم",
    courses: "الدورات",
    quizzes: "الاختبارات",
    lessons: "دروس",
    duration: "المدة",

    // Version
    version: "الإصدار 1.0.0",
  },
}

export type Language = "en" | "ar" | "vr"
export type TranslationKey = keyof typeof translations.en
