export const siteConfig = {
  name: "Pikinic",
  description:
    "Pikinic simplifies travel, study abroad, and settling in Lagos — one trusted ecosystem for the whole journey.",
  url: "https://pikinic.ng",
  founded: 2023,
  offices: "Lagos & Osun",
  email: "hello@pikinic.ng",
  address: "Lagos & Osun, Nigeria",
};

// Placeholder handles — swap for the real profiles before launch.
export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/pikinic.ng", icon: "instagram" },
  { label: "X", href: "https://x.com/pikinic_ng", icon: "x" },
  { label: "TikTok", href: "https://tiktok.com/@pikinic.ng", icon: "tiktok" },
  { label: "LinkedIn", href: "https://linkedin.com/company/pikinic", icon: "linkedin" },
] as const;

export const navLinks = [
  { label: "Home", href: "/" },
  // "Services" has no page of its own — it's a hover trigger for
  // whatWeOfferLinks below, each pointing at its own subdomain.
  { label: "Services", href: "#" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export const whatWeOfferLinks = [
  { label: "Study Abroad", href: "https://studyabroad.pikinic.ng" },
  { label: "Travel & Tours", href: "https://travelsandtours.pikinic.ng" },
  { label: "Stay & Ride", href: "https://stayandride.pikinic.ng" },
  { label: "Book a Flight", href: "https://travelsandtours.pikinic.ng" },
];

export type Service = {
  number: string;
  name: string;
  heading: string;
  description: string;
  image: { src: string; alt: string };
  href: string;
  theme: "light" | "dark";
};

export const services: Service[] = [
  {
    number: "01",
    name: "Study Abroad",
    heading: "STUDY ABROAD",
    description:
      "We match you with vetted schools and programs abroad, then handle visas, housing, and travel logistics from application to arrival, so you can focus on the experience ahead.",
    image: { src: "/images/study-abroad.jpg", alt: "Historic university courtyard" },
    href: "https://studyabroad.pikinic.ng",
    theme: "light",
  },
  {
    number: "02",
    name: "Travel and Tours",
    heading: "TRAVEL AND TOURS",
    description:
      "We curate group and solo tours to destinations worth the trip, handling flights, stays, and itineraries end to end, so every mile feels planned but never rushed.",
    image: { src: "/images/travel-tours.jpg", alt: "Friends celebrating together on a beach" },
    href: "https://travelsandtours.pikinic.ng",
    theme: "dark",
  },
  {
    number: "03",
    name: "Stay and Ride",
    heading: "STAY AND RIDE",
    description:
      "We line up vetted stays and reliable rides at every stop, from city apartments to countryside cabins, so getting there and settling in never slows down your trip.",
    image: { src: "/images/stay-ride.jpg", alt: "Warmly styled living room" },
    href: "https://stayandride.pikinic.ng",
    theme: "light",
  },
];

export const stats = [
  { value: "20,000", label: "Trips Planned" },
  { value: "15,000", label: "Students Placed" },
  { value: "10,000", label: "Stays Booked" },
  { value: "5,000", label: "Rides Arranged" },
];

export const footerColumns = [
  {
    heading: "Explore",
    links: [
      { label: "Flight Booking", href: "https://travelsandtours.pikinic.ng" },
      { label: "Scholarship", href: "https://studyabroad.pikinic.ng" },
      { label: "Vacation", href: "https://travelsandtours.pikinic.ng" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Study Abroad", href: "https://studyabroad.pikinic.ng" },
      { label: "Travels and Tour", href: "https://travelsandtours.pikinic.ng" },
      { label: "Stay and Ride", href: "https://stayandride.pikinic.ng" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Team", href: "/about#team" },
      { label: "Careers", href: "/about#careers" },
    ],
  },
];

export const team = [
  { name: "Akintoye Adeniyi", role: "Director" },
  { name: "Akintoye Adepeju", role: "Admin" },
];
