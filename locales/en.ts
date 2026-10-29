import type { Dictionary } from "./index";

const en: Dictionary = {
  meta: {
    title: "Websites for Learning Centers and Tutors | CaravanHouse",
    description:
      "Websites for learning centers and tutors in Uzbekistan: courses, prices, schedules and trial lesson sign-up. Requests arrive in your Telegram.",
    ogAlt: "CaravanHouse — websites for learning centers",
    ogTagline: "Websites for learning centers",
    ogTaglineAccent: "that fill your trial lessons",
    ogFooter: "Learning centers, tutors and online schools",
  },
  a11y: {
    skipToContent: "Skip to content",
    home: "CaravanHouse — home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNav: "Main navigation",
    language: "Site language",
    opensInTelegram: "opens in Telegram",
  },
  nav: {
    problems: "Why a website",
    site: "What's included",
    prices: "Pricing",
    process: "How we work",
    faq: "FAQ",
    contacts: "Contact",
  },
  cta: {
    telegram: "Discuss your website in Telegram",
    telegramShort: "Discuss your website",
    channel: "Follow our channel",
    channelShort: "Channel",
  },
  hero: {
    titleBefore: "A learning center website where students ",
    titleMark: "sign up for a trial lesson",
    titleAfter: "",
    // бегущая строка под hero
    audience: ["Learning centers", "Language schools", "Tutors", "Online schools", "IELTS & SAT prep", "IT courses", "Kids' centers", "University prep"],
    perks: ["Launch in 7 days", "Requests in Telegram", "Russian, Uzbek, English", "Placement test", "Group schedule", "Fixed price", "First month of support free"],
    subtitle:
      "Courses, prices, group schedules and a two-step sign-up. Every request lands with your admin in Telegram instead of getting lost in Instagram DMs.",
    primary: "Discuss your website",
    secondary: "See an example site",
    facts: ["Launch in 7 working days", "Russian, Uzbek and English", "Price fixed before we start"],
    schedule: {
      label: "Group schedule on a learning center website",
      title: "This week's schedule",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      seats: "seats",
      trial: "Trial",
      toastTitle: "New trial lesson request",
      toastText: "Malika, English A2, Saturday 14:00",
      toastFrom: "from the website",
    },
  },
  problems: {
    title: "What keeps your groups from filling up, and how a website fixes it",
    problemLabel: "Now",
    solutionLabel: "With a website",
    items: [
      {
        problem: "Requests get lost in Instagram DMs",
        solution: "Every request from the site goes to your admin in Telegram: name, phone, course and preferred time.",
      },
      {
        problem: "Your admin answers the same questions all day",
        solution: "Prices, schedules and teachers are on the site. Parents see everything and sign up right away.",
      },
      {
        problem: "Students book a trial lesson and don't show up",
        solution: "A bot confirms the booking and sends a reminder an hour before the lesson.",
      },
      {
        problem: "People can't find your center on Google or Yandex",
        solution: "A site in Russian, Uzbek and English with an SEO foundation, so both local parents and international students find you.",
      },
    ],
  },
  site: {
    title: "What your learning center website includes",
    subtitle: "We build the site from the blocks you actually need. Most centers start with these.",
    modules: [
      { id: "courses", title: "Courses and prices", text: "Subjects, levels, duration and cost, so you don't have to answer it in DMs." },
      { id: "schedule", title: "Group schedule", text: "Upcoming start dates and free seats, so it's clear which group still has room." },
      { id: "trial", title: "Trial lesson sign-up", text: "A two-step form: course and preferred time. The request goes straight to Telegram." },
      { id: "test", title: "Placement test", text: "A few questions, and the site suggests the right group." },
      { id: "teachers", title: "Teachers and results", text: "Photos, experience, your students' IELTS scores and university offers." },
      { id: "languages", title: "Russian, Uzbek and English", text: "Any combination of the three. English helps with international students and programs. Loads fast on phones." },
    ],
    demoTitle: "See how it works",
    demoText:
      "We built a demo website for a learning center called Zukko. The brand is made up, but everything else works: placement test, schedule, trial lesson sign-up and a student dashboard.",
    demoCta: "Open the demo site",
    imageAlt: "Demo learning center website: courses, trial lesson button and upcoming group starts",
    othersTitle: "Other sites we've built",
    others: { clinic: "Clinic website", store: "Online store" },
  },
  prices: {
    title: "Three packages for every size of school",
    subtitle: "Starting prices. We fix the exact price before work begins, and it doesn't change unless the scope does.",
    // {price} — цена из калькулятора calc.caravanhouse.uz (единый источник цен)
    pricePattern: "from {price} UZS",
    popular: "Most popular",
    choose: "Discuss this package",
    packages: {
      tutor: {
        title: "Tutor or small school",
        note: "One page that makes signing up quick",
        features: ["About you, subjects and prices", "Student reviews and results", "Trial lesson sign-up", "Requests in Telegram"],
      },
      center: {
        title: "Learning center",
        note: "A site for several subjects and branches",
        features: ["Courses, prices and teachers", "Group schedule and free seats", "Placement test that suggests a group", "Russian, Uzbek and English, SEO foundation"],
      },
      online: {
        title: "Online school",
        note: "A site with a student dashboard",
        features: ["Everything in Learning center", "Dashboard: lessons and homework", "Payments via Click and Payme", "Lesson access after payment"],
        price: "Price on request",
      },
    },
    addon: {
      title: "Sign-up bot for Telegram",
      text: "Confirms trial lesson bookings, sends a reminder an hour before class and answers common questions while your admin sleeps. Works with any package.",
    },
    payment: "Payment: {pre}% before we start, {post}% on delivery. First month of support is free, then from {support} UZS a month.",
    offerTitle: "15–20% off for our first three learning centers",
    offerText: "In exchange for a review and permission to show the site in our portfolio.",
  },
  process: {
    title: "How we build your website",
    steps: [
      { title: "Request", description: "Tell us in Telegram how many courses and branches you have. We reply the same day." },
      {
        title: "15-minute call",
        description: "We look at how students sign up with you today and send a site structure with price and timeline.",
      },
      {
        title: "Design and build",
        description: "We agree on the home page design, then build the site. Every week we show you what's ready.",
      },
      {
        title: "Launch",
        description: "We connect your domain, Telegram requests and analytics, and show your admin how everything works.",
      },
    ],
  },
  team: {
    title: "The people you talk to are the people who build it",
    subtitle: "There are three of us, no account managers in between. From the first message to launch, you deal with us directly.",
    viewWork: "See their work",
    workTitle: "Work",
    openWork: "Open the site",
    preview: "Site preview",
    backToTeam: "The whole team",
    ctaTitle: "Want a site like this for your center?",
    ctaText: "Message us on Telegram — we'll discuss the task and quote a price in 15 minutes.",
    ctaButton: "Discuss a site",
    photoAlt: "Photo",
    members: [
      { id: "umid", name: "Umid", role: "Development", bio: "Websites, back end and Telegram bots.",
        work: { title: "Zukko learning center demo site", description: "A complete learning center site: courses and prices, a level test that suggests a group, a timetable with free seats, trial lesson booking and a student account. The brand is made up; everything else works.", tags: ["Learning center", "Level test", "Student account", "RU · UZ"] } },
      { id: "arslan", name: "Arslan", role: "Projects and clients", bio: "Runs the project and owns deadlines and results.",
        work: { title: "NEW ERA — online trading school", description: "A platform with Standard and Pro courses: lessons with video, notes and a test, student progress with XP, reviews and several payment options.", tags: ["Online school", "Courses", "Tests", "Progress"] } },
      { id: "behruz", name: "Behruz", role: "Interfaces", bio: "Front end and site interfaces.",
        work: { title: "Maktab Portali — school portal", description: "A portal for students, teachers and school staff: online tests with instant results, homework, video lessons, class rankings and a rewards store for points.", tags: ["School", "Tests", "Homework", "Rankings"] } },
    ],
  },
  faq: {
    title: "Frequently asked questions",
    // {support} — цена поддержки из калькулятора (calc.caravanhouse.uz/api/prices)
    items: [
      {
        question: "How long does a website take?",
        answer:
          "A tutor site takes 5–7 working days. A learning center site takes 2–3 weeks. An online school with a student dashboard takes 4 weeks or more. We fix the exact timeline before we start.",
      },
      {
        question: "What do we need to prepare?",
        answer:
          "Your list of courses and prices, group schedule, teacher photos and a few student reviews. We'll help write the copy, and if you don't have photos, we'll show you how to take them on a phone.",
      },
      {
        question: "Where do requests go?",
        answer: "To Telegram: your admin's private messages or a shared team chat. Each request includes the name, phone, chosen course and preferred time.",
      },
      {
        question: "Can you build the site in English?",
        answer:
          "Yes. We build sites in Russian, Uzbek and English, in any combination. An English version is useful if you have international students, native-speaker teachers or programs like IELTS, SAT and study abroad. We handle the translation.",
      },
      {
        question: "Why a bot if we have a website?",
        answer:
          "The website brings the student in, and the bot gets them to the lesson: it confirms the booking, sends a reminder an hour before and answers common questions at night. The bot is optional; the site works without it.",
      },
      {
        question: "Can we change the schedule and prices?",
        answer:
          "Yes. Send us changes in Telegram: free for the first month, then as part of support from {support} UZS a month. If you change things often, we'll add a section where your admin edits the schedule directly.",
      },
      {
        question: "How does payment work?",
        answer: "In two parts: 50% before we start and 50% when the site is delivered. Larger projects can be split into stages.",
      },
      {
        question: "Who owns the site and domain?",
        answer: "You do. We register the domain in your name from day one and hand over the code and all access after full payment.",
      },
      {
        question: "Who pays for hosting?",
        answer: "You do, on your own account with the provider, so the site is always under your control. We choose and set everything up.",
      },
      {
        question: "Do you only work with learning centers?",
        answer:
          "Education is our focus: learning centers, language schools, tutors and online schools. We know how trial lessons, groups and payments work there, so we launch faster. If your business is different, message us anyway and we'll suggest a solution.",
      },
    ],
  },
  finalCta: {
    title: "Let's plan your learning center website in 15 minutes",
    subtitle: "Tell us how many courses and branches you have. We'll suggest a site structure and give you a price. Free, with no commitment.",
    button: "Message us in Telegram",
    orCall: "or call",
    or: "or",
    form: {
      title: "Send a request",
      name: "Name",
      namePlaceholder: "What should we call you?",
      contact: "Phone or Telegram",
      contactPlaceholder: "+998… or @username",
      service: "What you need",
      services: { site: "Learning center website", bot: "Website and sign-up bot", other: "Something else" },
      message: "Courses and branches (optional)",
      submit: "Send request",
      sending: "Sending…",
      success: "Thank you! Request #{id} is sent. We'll get back to you shortly.",
      successNoId: "Thank you! Your request is sent. We'll get back to you shortly.",
      errorName: "Enter your name",
      errorContact: "Enter a phone number or Telegram username",
      errorRate: "Too many requests from this device. Try again later or message us in Telegram.",
      errorFailed: "Couldn't send the request. Message us in Telegram or call — we reply fast.",
      consent: "By sending a request, you agree that we'll contact you using the details provided.",
    },
  },
  footer: {
    team: "CaravanHouse team, Tashkent",
    response: "Open 09:00 to 21:00",
    tagline: "Websites for learning centers, language schools, tutors and online schools in Uzbekistan.",
    contactsTitle: "Contact",
    navTitle: "Navigation",
    socialTitle: "Social media",
    rights: "All rights reserved.",
  },
  update: {
    text: "The site has been updated",
    button: "Refresh",
    dismiss: "Close",
  },
  availability: {
    online: "Online now, open until 21:00 (Tashkent)",
    beforeOpen: "We're closed right now — we'll reply today from 09:00 (Tashkent)",
    afterClose: "We're closed right now — we'll reply tomorrow from 09:00 (Tashkent)",
  },
  floating: {
    label: "Message us in Telegram",
  },
};

export default en;
