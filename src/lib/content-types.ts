// Shared types + default seed data for admin-editable site content.
// These seeds are used both as the fallback rendered on the public site
// (before the JSON data file has been created on the server) and as the
// initial content written to disk the first time each JSON file is read.

import type { IconName } from "./icon-map"

export interface FaqItem {
  id: string
  question_en: string
  answer_en: string
  question_ar: string
  answer_ar: string
}

export interface FaqContent {
  items: FaqItem[]
}

export const faqSeed: FaqContent = {
  items: [
    {
      id: "faq-1",
      question_en: "Is the consultation really free?",
      answer_en:
        "Yes! We provide completely free educational consultations. Our service is free for students from the initial consultation through to acceptance and enrollment.",
      question_ar: "هل الاستشارة مجانية حقاً؟",
      answer_ar:
        "نعم! نقدم استشارات تعليمية مجانية تماماً. خدمتنا مجانية للطلاب من الاستشارة الأولية وحتى القبول والتسجيل.",
    },
    {
      id: "faq-2",
      question_en: "What support do you provide after arrival?",
      answer_en:
        "We arrange airport pickup, help with accommodation, assist with bank account setup, and provide ongoing support throughout your study period. We're available 24/7 for our students.",
      question_ar: "ما الدعم الذي تقدمونه بعد الوصول؟",
      answer_ar:
        "نرتب الاستقبال في المطار، ونساعد في السكن، ونساعد في إعداد الحساب البنكي، ونقدم دعماً مستمراً طوال فترة دراستك. نحن متاحون على مدار الساعة لطلابنا.",
    },
  ],
}

export interface NavLink {
  id: string
  href: string
  label_en: string
  label_ar: string
}

export interface NavContent {
  headerLinks: NavLink[]
  footerLinks: NavLink[]
}

export const navSeed: NavContent = {
  headerLinks: [
    { id: "nav-home", href: "/", label_en: "Home", label_ar: "الرئيسية" },
    { id: "nav-about", href: "/about", label_en: "About Us", label_ar: "من نحن" },
    { id: "nav-services", href: "/services", label_en: "Services", label_ar: "الخدمات" },
    { id: "nav-countries", href: "/countries", label_en: "Countries", label_ar: "الدول" },
    { id: "nav-discover-egypt", href: "/discover-egypt", label_en: "Discover Egypt", label_ar: "اكتشف مصر" },
    { id: "nav-blog", href: "/blog", label_en: "Blog", label_ar: "المدونة" },
    { id: "nav-partners", href: "/partners", label_en: "Partners", label_ar: "الشركاء" },
    { id: "nav-promotions", href: "/promotions", label_en: "Promotions", label_ar: "العروض" },
    { id: "nav-contact", href: "/contact", label_en: "Contact Us", label_ar: "اتصل بنا" },
  ],
  footerLinks: [
    { id: "footer-about", href: "/about", label_en: "About Us", label_ar: "من نحن" },
    { id: "footer-services", href: "/services", label_en: "Services", label_ar: "الخدمات" },
    { id: "footer-countries", href: "/countries", label_en: "Countries", label_ar: "الدول" },
    { id: "footer-scholarships", href: "/scholarships", label_en: "Scholarships", label_ar: "المنح" },
    { id: "footer-partners", href: "/partners", label_en: "Partners", label_ar: "الشركاء" },
    { id: "footer-promotions", href: "/promotions", label_en: "Promotions", label_ar: "العروض" },
    { id: "footer-contact", href: "/contact", label_en: "Contact Us", label_ar: "اتصل بنا" },
  ],
}

export interface BlogParagraphBlock {
  id: string
  type: "paragraph"
  text_en: string
  text_ar: string
}

export interface BlogImageBlock {
  id: string
  type: "image"
  url: string
  caption_en: string
  caption_ar: string
}

export interface BlogVideoBlock {
  id: string
  type: "video"
  url: string
  caption_en: string
  caption_ar: string
}

export type BlogContentBlock = BlogParagraphBlock | BlogImageBlock | BlogVideoBlock

export interface BlogPost {
  id: string
  slug: string
  emoji: string
  coverImage: string
  category_en: string
  category_ar: string
  title_en: string
  title_ar: string
  excerpt_en: string
  excerpt_ar: string
  blocks: BlogContentBlock[]
  date: string
  read_time_en: string
  read_time_ar: string
  published: boolean
}

export interface BlogContent {
  posts: BlogPost[]
}

export const blogSeed: BlogContent = {
  posts: [],
}

export interface ContactSocialLinks {
  facebook: string
  twitter: string
  instagram: string
  linkedin: string
}

export interface ContactContent {
  address_en: string
  address_ar: string
  phone: string
  email: string
  working_hours_en: string
  working_hours_ar: string
  whatsapp_number: string
  social: ContactSocialLinks
}

export const contactSeed: ContactContent = {
  address_en: "53 - Al Fayrouz street - 10th neighborhood - Area 1 - Sheikh Zayed",
  address_ar: "53 شارع الفيروز - المجاورة العاشرة - الحي الأول - الشيخ زايد",
  phone: "+201092020733",
  email: "info@visionedge-eg.com",
  working_hours_en: "Sun - Thu: 9:00 AM - 6:00 PM",
  working_hours_ar: "الأحد - الخميس: 9:00 صباحاً - 6:00 مساءً",
  whatsapp_number: "201092020733",
  social: {
    facebook: "#",
    twitter: "#",
    instagram: "#",
    linkedin: "#",
  },
}

export interface AboutPoint {
  id: string
  text_en: string
  text_ar: string
}

export interface AboutValueCard {
  id: string
  icon: IconName
  title_en: string
  title_ar: string
  description_en: string
  description_ar: string
}

export interface AboutStat {
  id: string
  icon: IconName
  value: string
  label_en: string
  label_ar: string
}

export interface AboutTimelineItem {
  id: string
  year: string
  title_en: string
  title_ar: string
  description_en: string
  description_ar: string
}

export interface AboutTeamMember {
  id: string
  name: string
  role_en: string
  role_ar: string
  initials: string
}

export interface AboutContent {
  whoWeAre_en: string
  whoWeAre_ar: string
  description_en: string
  description_ar: string
  whyChooseUs_en: string
  whyChooseUs_ar: string
  points: AboutPoint[]
  valueCards: AboutValueCard[]
  stats: AboutStat[]
  timeline: AboutTimelineItem[]
  team: AboutTeamMember[]
}

export interface HomeStat {
  id: string
  value: string
  label_en: string
  label_ar: string
}

export interface HomeServiceCard {
  id: string
  icon: IconName
  title_en: string
  title_ar: string
  description_en: string
  description_ar: string
}

export interface HomeCountry {
  id: string
  name: string
  code: string
  universities: string
}

export interface HomeTestimonial {
  id: string
  name: string
  country: string
  rating: number
  text: string
}

export interface HomeContent {
  hero_title_en: string
  hero_title_ar: string
  hero_subtitle_en: string
  hero_subtitle_ar: string
  stats: HomeStat[]
  services_title_en: string
  services_title_ar: string
  services_subtitle_en: string
  services_subtitle_ar: string
  services: HomeServiceCard[]
  destinations_title_en: string
  destinations_title_ar: string
  destinations_subtitle_en: string
  destinations_subtitle_ar: string
  countries: HomeCountry[]
  testimonials_title_en: string
  testimonials_title_ar: string
  testimonials_subtitle_en: string
  testimonials_subtitle_ar: string
  testimonials: HomeTestimonial[]
  cta_title_en: string
  cta_title_ar: string
  cta_description_en: string
  cta_description_ar: string
}

export const homeSeed: HomeContent = {
  hero_title_en: "Your Compass for Studying Abroad",
  hero_title_ar: "جسرك نحو التعليم العالمي",
  hero_subtitle_en:
    "We provide consultations, admissions, and pre-travel preparations, facilitating all procedures until arrival and the start of studies.",
  hero_subtitle_ar:
    "نقدم الاستشارات والقبول والتحضيرات قبل السفر، نسهّل جميع الإجراءات حتى الوصول وبدء الدراسة.",
  stats: [
    { id: "stat-1", value: "5000+", label_en: "Students Placed", label_ar: "طالب تم إلحاقه" },
    { id: "stat-2", value: "50+", label_en: "Partners", label_ar: "جامعة شريكة" },
    { id: "stat-3", value: "15+", label_en: "Countries", label_ar: "دولة" },
    { id: "stat-4", value: "95%", label_en: "Success Rate", label_ar: "نسبة النجاح" },
  ],
  services_title_en: "Our Services",
  services_title_ar: "خدماتنا",
  services_subtitle_en: "Comprehensive services to guide your educational journey",
  services_subtitle_ar: "خدمات متكاملة لإرشادك خلال رحلتك التعليمية",
  services: [
    {
      id: "svc-1",
      icon: "GraduationCap",
      title_en: "Language Institute and University Admissions",
      title_ar: "القبول في معاهد اللغات والجامعات",
      description_en: "We help you secure admission to top language institutes and universities worldwide based on your preferences and qualifications.",
      description_ar: "نساعدك في الحصول على القبول في أفضل معاهد اللغات والجامعات حول العالم بناءً على تفضيلاتك ومؤهلاتك.",
    },
    {
      id: "svc-2",
      icon: "Globe",
      title_en: "Logistical Services",
      title_ar: "الخدمات اللوجستية",
      description_en: "From accommodation to airport pickup, we handle all logistical arrangements to ensure a smooth transition.",
      description_ar: "من السكن إلى الاستقبال من المطار، نتولى جميع الترتيبات اللوجستية لضمان انتقال سلس.",
    },
    {
      id: "svc-3",
      icon: "Users",
      title_en: "Guidance and Counseling",
      title_ar: "التوجيه والإرشاد",
      description_en: "Expert career counseling and academic guidance to help you choose the right path for your future.",
      description_ar: "استشارات مهنية متخصصة وتوجيه أكاديمي لمساعدتك على اختيار المسار الصحيح لمستقبلك.",
    },
    {
      id: "svc-4",
      icon: "Award",
      title_en: "24/7 Support and Assistance",
      title_ar: "دعم ومساعدة على مدار الساعة",
      description_en: "Round-the-clock support for all your needs, from application to arrival and beyond.",
      description_ar: "دعم على مدار الساعة لجميع احتياجاتك، من التقديم إلى الوصول وما بعده.",
    },
  ],
  destinations_title_en: "Study Destinations",
  destinations_title_ar: "وجهات الدراسة",
  destinations_subtitle_en: "Explore universities and colleges around the world",
  destinations_subtitle_ar: "استكشف الجامعات والكليات حول العالم",
  countries: [
    { id: "c-us", name: "USA", code: "us", universities: "500+" },
    { id: "c-gb", name: "UK", code: "gb", universities: "300+" },
    { id: "c-au", name: "Australia", code: "au", universities: "200+" },
    { id: "c-ca", name: "Canada", code: "ca", universities: "250+" },
    { id: "c-de", name: "Germany", code: "de", universities: "150+" },
    { id: "c-ie", name: "Ireland", code: "ie", universities: "50+" },
    { id: "c-my", name: "Malaysia", code: "my", universities: "100+" },
    { id: "c-ae", name: "UAE", code: "ae", universities: "80+" },
    { id: "c-nz", name: "New Zealand", code: "nz", universities: "30+" },
    { id: "c-za", name: "South Africa", code: "za", universities: "40+" },
  ],
  testimonials_title_en: "What They Say About Us",
  testimonials_title_ar: "ماذا يقولون عنا",
  testimonials_subtitle_en: "Testimonials from our clients that we are proud of",
  testimonials_subtitle_ar: "شهادات من عملائنا نفتخر بها",
  testimonials: [
    { id: "t-1", name: "Ahmed Al-Rashid", country: "Studying in UK", rating: 5, text: "Vision Edge made my dream of studying in the UK a reality. Their guidance throughout the application process was exceptional." },
    { id: "t-2", name: "Sara Hassan", country: "Studying in Canada", rating: 5, text: "From university selection to visa approval, Vision Edge was there every step of the way. Highly recommended!" },
    { id: "t-3", name: "Omar Khalid", country: "Studying in Australia", rating: 5, text: "The team at Vision Edge provided excellent support and helped me secure a scholarship. I couldn't have done it without them." },
  ],
  cta_title_en: "Ready to Start Your Journey?",
  cta_title_ar: "هل أنت مستعد لبدء رحلتك؟",
  cta_description_en: "Get free consultation and take the first step towards your international education dream.",
  cta_description_ar: "احصل على استشارة مجانية واتخذ الخطوة الأولى نحو حلمك في التعليم الدولي.",
}

export const aboutSeed: AboutContent = {
  whoWeAre_en: "Who We Are",
  whoWeAre_ar: "من نحن",
  description_en:
    "An educational agency specializing in organizing summer and winter camps at accredited Egyptian universities, offering comprehensive services for studying abroad and providing thorough educational consultations to help students achieve their dreams of international education.",
  description_ar:
    "وكالة تعليمية متخصصة في تنظيم المعسكرات الصيفية والشتوية في الجامعات المصرية المعتمدة، تقدم خدمات متكاملة للدراسة في الخارج واستشارات تعليمية شاملة لمساعدة الطلاب على تحقيق أحلامهم في التعليم الدولي.",
  whyChooseUs_en: "Why Choose Us?",
  whyChooseUs_ar: "لماذا Vision Edge؟",
  points: [
    { id: "point-1", text_en: "Free educational consultations", text_ar: "استشارات تعليمية مجانية" },
    { id: "point-2", text_en: "Collaborations with top universities worldwide", text_ar: "شراكات مع أفضل الجامعات حول العالم" },
    { id: "point-3", text_en: "Expert guidance throughout the application process", text_ar: "توجيه متخصص خلال عملية التقديم" },
    { id: "point-4", text_en: "Visa assistance and travel preparation", text_ar: "مساعدة في التأشيرات والتحضير للسفر" },
    { id: "point-5", text_en: "24/7 support for students", text_ar: "دعم على مدار الساعة للطلاب" },
  ],
  valueCards: [
    {
      id: "value-message",
      icon: "Rocket",
      title_en: "Our Message",
      title_ar: "رسالتنا",
      description_en: "To provide educational services with global standards that inspire ambitious youth to innovate and achieve their dreams.",
      description_ar: "تقديم خدمات تعليمية بمعايير عالمية تلهم الشباب الطموح للابتكار وتحقيق أحلامهم.",
    },
    {
      id: "value-mission",
      icon: "Target",
      title_en: "Our Mission",
      title_ar: "مهمتنا",
      description_en: "Educational consultations and guidance to select the best language institutes and universities with reliable, high-quality services.",
      description_ar: "الاستشارات التعليمية والتوجيه لاختيار أفضل معاهد اللغات والجامعات بخدمات موثوقة وعالية الجودة.",
    },
    {
      id: "value-vision",
      icon: "Eye",
      title_en: "Our Vision",
      title_ar: "رؤيتنا",
      description_en: "To become the leading trusted name in the Arab world for studying abroad.",
      description_ar: "أن نكون الاسم الموثوق الرائد في العالم العربي للدراسة في الخارج.",
    },
    {
      id: "value-values",
      icon: "Heart",
      title_en: "Our Values",
      title_ar: "قيمنا",
      description_en: "Integrity • Quality • Development • Commitment — the foundation of our dealings with clients and partners.",
      description_ar: "النزاهة • الجودة • التطوير • الالتزام — أساس تعاملاتنا مع العملاء والشركاء.",
    },
  ],
  stats: [
    { id: "stat-students", icon: "Users", value: "5000+", label_en: "Students Placed", label_ar: "طالب تم إلحاقه" },
    { id: "stat-countries", icon: "Globe", value: "15+", label_en: "Countries", label_ar: "دولة" },
    { id: "stat-universities", icon: "Award", value: "50+", label_en: "Partner Universities", label_ar: "جامعة شريكة" },
    { id: "stat-years", icon: "Calendar", value: "6+", label_en: "Years Experience", label_ar: "سنوات خبرة" },
  ],
  timeline: [
    { id: "tl-2018", year: "2018", title_en: "Founded", title_ar: "التأسيس", description_en: "Vision Edge was established in Cairo, Egypt.", description_ar: "تأسست Vision Edge في القاهرة، مصر." },
    { id: "tl-2019", year: "2019", title_en: "First 100 Students", title_ar: "أول 100 طالب", description_en: "Successfully placed our first 100 students in international universities.", description_ar: "نجحنا في إلحاق أول 100 طالب بجامعات دولية." },
    { id: "tl-2020", year: "2020", title_en: "Global Expansion", title_ar: "التوسع العالمي", description_en: "Expanded partnerships to 10+ countries across 5 continents.", description_ar: "توسعنا في شراكات تشمل أكثر من 10 دول عبر 5 قارات." },
    { id: "tl-2021", year: "2021", title_en: "Digital Transformation", title_ar: "التحول الرقمي", description_en: "Launched our digital platform for seamless student applications.", description_ar: "أطلقنا منصتنا الرقمية لتسهيل طلبات الطلاب." },
    { id: "tl-2022", year: "2022", title_en: "1000+ Students", title_ar: "أكثر من 1000 طالب", description_en: "Reached milestone of placing 1000+ students worldwide.", description_ar: "لقد حققنا إنجازاً هاماً بتوظيف أكثر من 1000 طالب حول العالم." },
    { id: "tl-2023", year: "2023", title_en: "Award-Winning", title_ar: "جائزة التميز", description_en: "Recognized as a top educational consultancy in the Arab world.", description_ar: "حصلنا على لقب أفضل وكالة تعليمية في العالم العربي." },
    { id: "tl-2024", year: "2024", title_en: "5000+ Students", title_ar: "أكثر من 5000 طالب", description_en: "Over 5000 students successfully placed in 50+ partner universities.", description_ar: "أكثر من 5000 طالب تم إلحاقهم بنجاح في أكثر من 50 جامعة شريكة." },
  ],
  team: [
    { id: "team-1", name: "Mr. Mohammed Sabbahi", role_en: "Founder & CEO", role_ar: "المؤسس والرئيس التنفيذي", initials: "MS" },
    { id: "team-2", name: "Mr. Yehia El-Samman", role_en: "Head of Operations & Co-Founder", role_ar: "رئيس العمليات والمؤسس المشارك", initials: "YS" },
    { id: "team-3", name: "", role_en: "Visa Specialist", role_ar: "متخصص التأشيرات", initials: "KR" },
    { id: "team-4", name: "", role_en: "Student Counselor", role_ar: "مستشارة الطلاب", initials: "ND" },
    { id: "team-5", name: "", role_en: "Partnerships Director", role_ar: "مدير الشراكات", initials: "OS" },
    { id: "team-6", name: "", role_en: "Operations Manager", role_ar: "مديرة العمليات", initials: "FH" },
  ],
}

export interface PartnerItem {
  id: string
  name: string
  logo: string
  website: string
}

export interface PartnersContent {
  title_en: string
  title_ar: string
  subtitle_en: string
  subtitle_ar: string
  partners: PartnerItem[]
}

export const partnersSeed: PartnersContent = {
  title_en: "Our Partners",
  title_ar: "شركاؤنا",
  subtitle_en: "We collaborate with leading universities and institutions around the world.",
  subtitle_ar: "نتعاون مع أفضل الجامعات والمؤسسات حول العالم.",
  partners: [],
}

export interface PromotionItem {
  id: string
  title_en: string
  title_ar: string
  description_en: string
  description_ar: string
  image: string
}

export interface PromotionsContent {
  title_en: string
  title_ar: string
  subtitle_en: string
  subtitle_ar: string
  promotions: PromotionItem[]
}

export const promotionsSeed: PromotionsContent = {
  title_en: "Promotions",
  title_ar: "العروض",
  subtitle_en: "Special offers and promotions for our students.",
  subtitle_ar: "عروض وتخفيضات خاصة لطلابنا.",
  promotions: [],
}
