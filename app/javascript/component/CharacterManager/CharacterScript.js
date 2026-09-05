// Crafta Creatives - Animated Manager Character Dialogue & Walk Waypoint Engine

export const CHARACTER_WAYPOINTS = [
  {
    id: "hero",
    scrollMin: 0,
    scrollMax: 12,
    position: { x: "50%", y: "45%", align: "-translate-x-1/2 -translate-y-1/2" },
    pose: "waving", // Character pose: Waving / Welcome
    dialogue: "Welcome to Crafta Creatives! 👋 Naan thaan inga Manager! Enga bosses-uh enna appoint pannirukanga ungaluku enga agency-a suthikaatta. Scroll panni vaanga!",
    badge: "Agency Manager",
  },
  {
    id: "services",
    scrollMin: 13,
    scrollMax: 38,
    position: { x: "85%", y: "60%", align: "-translate-x-full" },
    pose: "pointing", // Character pose: Pointing to left content
    dialogue: "Look here! 👈 Enga Crafta Creatives-la Web Development, SaaS MVPs, Logo Design, Product Shoots, Video Editing & Banners — ellam top class-ah pannuvom!",
    badge: "Services Guide",
  },
  {
    id: "portfolio",
    scrollMin: 39,
    scrollMax: 65,
    position: { x: "15%", y: "65%", align: "translate-x-0" },
    pose: "laptop", // Character pose: Laptop / Showcase
    dialogue: "Ippo neenga paakuradhu enga Portfolio Projects! 💻 Live Web Apps, Brand Logos & HD Video Edits-a check panni paarunga!",
    badge: "Portfolio Showcase",
  },
  {
    id: "quote",
    scrollMin: 66,
    scrollMax: 85,
    position: { x: "80%", y: "70%", align: "-translate-x-full" },
    pose: "thinking", // Character pose: Thinking / Calculator
    dialogue: "Ungalukku enna services venum-nu ungalukke estimate panna mudiyuma? 👇 Kela irukura interactive calculator-la pick pannunga!",
    badge: "Quote Estimator",
  },
  {
    id: "contact",
    scrollMin: 86,
    scrollMax: 100,
    position: { x: "50%", y: "75%", align: "-translate-x-1/2" },
    pose: "phone", // Character pose: Phone / Call me
    dialogue: "Ellam pathuttingala? 📞 Super! Direct-ah enga Crafta Creatives bosses-ku message anupunga, okamudila Project-a Start pannuvom!",
    badge: "Contact Host",
  },
];