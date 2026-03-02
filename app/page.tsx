"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/* ───────────────────────────── DATA ───────────────────────────── */

const PHONE = "(732) 987-4411";
const PHONE_HREF = "tel:+17329874411";
const EMAIL = "cozyofficenj@gmail.com";
const ADDRESS = "500 River Ave, Suite 100, Lakewood, NJ 08701";
const LICENSE = "NJ License #170800294";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Our Team", href: "#team" },
  { label: "Programs", href: "#programs" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Location", href: "#location" },
];

const TEAM = [
  {
    name: "Ms. Sarah",
    role: "Lead Infant Teacher",
    image: "/images/team/teacher1.png",
    bio: "With 8 years of nurturing experience, Ms. Sarah creates a safe and stimulating environment where our youngest learners can explore and grow with confidence.",
    certs: ["CDA Certified", "Infant CPR"],
  },
  {
    name: "Ms. Rachel",
    role: "Toddler Room Director",
    image: "/images/team/teacher2.png",
    bio: "Holding a degree in Early Childhood Education, Ms. Rachel designs engaging activities that support toddlers in building language skills and independence.",
    certs: ["B.A. Education", "First Aid"],
  },
  {
    name: "Ms. Miriam",
    role: "Preschool Teacher",
    image: "/images/team/teacher3.png",
    bio: "Bilingual in English and Spanish, Ms. Miriam brings creativity and cultural richness to the classroom through arts, music, and hands-on learning.",
    certs: ["Bilingual", "Arts & Music"],
  },
  {
    name: "Ms. Devorah",
    role: "Pre-K Teacher",
    image: "/images/team/teacher4.png",
    bio: "A kindergarten readiness specialist, Ms. Devorah focuses on preparing children for school success through literacy, math, and social-emotional development.",
    certs: ["K-Readiness", "STEM Ed"],
  },
  {
    name: "Mr. David",
    role: "Activity Coordinator",
    image: "/images/team/teacher5.png",
    bio: "Mr. David leads outdoor education and STEM projects that inspire curiosity and teamwork, keeping children active, engaged, and learning through play.",
    certs: ["Outdoor Ed", "STEM Projects"],
  },
  {
    name: "Our Director",
    role: "Center Director",
    image: "/images/team/director.png",
    bio: "Our director oversees all programs with deep roots in the Lakewood community, bringing passion and dedication to every family we serve.",
    certs: ["Licensed Director", "NJ Certified"],
  },
];

const PROGRAMS = [
  {
    title: "Infant Care",
    ages: "6 Weeks - 12 Months",
    image: "/images/programs/infant.png",
    description:
      "A nurturing environment where infants receive one-on-one attention, sensory play, and developmental milestones tracking in a safe, loving setting.",
    features: ["1:4 teacher ratio", "Daily reports", "Sensory play"],
  },
  {
    title: "Toddler Program",
    ages: "1 - 2 Years",
    image: "/images/programs/toddler.png",
    description:
      "Interactive learning through play, music, and movement. Our toddler program builds language skills, motor development, and early social connections.",
    features: ["Language building", "Music & movement", "Social skills"],
  },
  {
    title: "Preschool",
    ages: "3 - 4 Years",
    image: "/images/programs/preschool.png",
    description:
      "A structured curriculum blending academics with creativity. Children explore letters, numbers, science, and art in a joyful, engaging classroom.",
    features: ["Pre-literacy", "STEM basics", "Creative arts"],
  },
  {
    title: "Pre-K",
    ages: "4 - 5 Years",
    image: "/images/programs/preschool.png",
    description:
      "Comprehensive kindergarten readiness program focusing on reading, writing, math, and social-emotional skills for a confident school transition.",
    features: ["School readiness", "Reading & writing", "Math foundations"],
  },
  {
    title: "After School",
    ages: "5 - 6 Years",
    image: "/images/programs/afterschool.png",
    description:
      "A safe, fun after-school environment with homework help, enrichment activities, outdoor play, and healthy snacks.",
    features: ["Homework help", "Enrichment", "Outdoor play"],
  },
];

const GALLERY = [
  { src: "/images/gallery/classroom.png", alt: "Bright, colorful classroom" },
  { src: "/images/gallery/playground.png", alt: "Outdoor playground" },
  { src: "/images/gallery/reading-corner.png", alt: "Cozy reading corner" },
  { src: "/images/gallery/arts-crafts.png", alt: "Arts and crafts room" },
];

const TESTIMONIALS = [
  {
    quote:
      "Cozy Island has been an absolute blessing for our family. My daughter runs to the door every morning because she loves her teachers so much. The care and attention they give each child is extraordinary.",
    name: "Rebecca M.",
    detail: "Parent of 3-year-old",
  },
  {
    quote:
      "We were nervous about leaving our infant at daycare, but the staff at Cozy Island made us feel completely at ease. They send us photos throughout the day and our son is thriving.",
    name: "Daniel & Shira K.",
    detail: "Parents of 8-month-old",
  },
  {
    quote:
      "The preschool program prepared my son for kindergarten beyond expectations. He's reading, doing basic math, and most importantly he's confident and happy. The teachers here truly care.",
    name: "Michelle T.",
    detail: "Parent of 5-year-old",
  },
];

const HOURS = [
  { day: "Monday - Thursday", time: "8:00 AM - 5:30 PM" },
  { day: "Friday", time: "8:00 AM - 1:00 PM" },
  { day: "Saturday - Sunday", time: "Closed" },
];

/* ──────────────── INTERSECTION OBSERVER HOOK ──────────────── */

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, triggered };
}

/* ───────────────────────────── PAGE ───────────────────────────── */

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* ═══════════════ NAV (light-minimal) ═══════════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          <button
            onClick={() => scrollTo("#")}
            className="flex items-center gap-2"
          >
            <Image
              src="/images/logo.png"
              alt="Cozy Island Day Care"
              width={180}
              height={60}
              className="h-10 w-auto sm:h-12"
              priority
            />
          </button>

          {/* Desktop links */}
          <div className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-text transition-colors hover:text-primary"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contact")}
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-accent-dark hover:shadow-lg hover:-translate-y-0.5"
            >
              Schedule a Tour
            </button>
          </div>

          {/* Mobile: phone + hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <a href={PHONE_HREF} className="text-primary" aria-label="Call us">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`block h-0.5 w-5 bg-text rounded-full transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                <span className={`block h-0.5 w-5 bg-text rounded-full transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-5 bg-text rounded-full transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            style={{ top: "64px" }}
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Mobile menu */}
        <div
          className={`fixed top-16 left-0 right-0 bg-white z-50 shadow-xl transition-all duration-300 lg:hidden ${
            mobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="px-6 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="block w-full text-left py-3 text-base font-medium text-text hover:text-primary transition-colors border-b border-gray-100 last:border-0"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 pb-2">
              <button
                onClick={() => scrollTo("#contact")}
                className="block w-full bg-accent hover:bg-accent-dark text-white text-center py-3 rounded-xl font-semibold transition-colors"
              >
                Schedule a Tour
              </button>
            </div>
            <a href={PHONE_HREF} className="flex items-center gap-2 py-3 text-primary font-medium">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {PHONE}
            </a>
          </div>
        </div>
      </nav>

      {/* ═══════════════ HERO (overlay) ═══════════════ */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.png"
            alt="Happy children playing at Cozy Island Day Care"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2D3748]/80 via-[#2D3748]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D3748]/40 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 lg:px-8">
          <div className="max-w-2xl">
            <div className="animate-fade-in-up">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white/90">
                <span className="w-2 h-2 bg-accent rounded-full" />
                NJ Licensed Childcare Center
              </span>
            </div>
            <h1 className="animate-fade-in-up mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl delay-100">
              Where Every Child{" "}
              <span className="text-accent-light">Feels at Home</span>
            </h1>
            <p className="animate-fade-in-up mt-6 max-w-lg text-lg leading-relaxed text-white/90 sm:text-xl delay-200">
              A warm, safe, and nurturing environment where your child can
              explore, learn, and thrive. Serving Lakewood, NJ families with
              love since day one.
            </p>
            <div className="animate-fade-in-up mt-8 flex flex-col gap-4 sm:flex-row delay-300">
              <button
                onClick={() => scrollTo("#contact")}
                className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-accent-dark hover:shadow-xl hover:-translate-y-0.5"
              >
                Schedule a Tour
              </button>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/20"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 01.97-.27 11.39 11.39 0 003.58.57 1 1 0 011.04 1v3.49a1 1 0 01-1.04 1A17 17 0 013 5.04 1 1 0 014.04 4h3.49a1 1 0 011 1.04c0 1.21.19 2.42.57 3.58a1 1 0 01-.27.97l-2.21 2.2z" />
                </svg>
                {PHONE}
              </a>
            </div>
            <div className="animate-fade-in-up mt-6 flex items-center gap-6 delay-400">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-semibold text-white/90">5.0 on Google</span>
              </div>
              <div className="hidden h-5 w-px bg-white/30 sm:block" />
              <span className="hidden text-sm font-medium text-white/80 sm:block">172 Children Capacity</span>
              <div className="hidden h-5 w-px bg-white/30 sm:block" />
              <span className="hidden text-sm font-medium text-white/80 sm:block">4 Languages</span>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0 100V50C240 15 480 0 720 15C960 30 1200 65 1440 50V100H0Z" fill="#FFF8F0" />
          </svg>
        </div>
      </section>

      {/* Section order follows Community Arc: About early, then Team, Programs, Gallery, Reviews, Location, CTA */}
      <AboutSection scrollTo={scrollTo} />
      <TeamSection />
      <ProgramsSection scrollTo={scrollTo} />
      <GallerySection />
      <TestimonialsSection />
      <LocationSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*                         ABOUT SECTION                          */
/* ═══════════════════════════════════════════════════════════════ */

function AboutSection({ scrollTo }: { scrollTo: (href: string) => void }) {
  const { ref, triggered } = useInView();
  return (
    <section id="about" className="bg-light py-20 lg:py-28" ref={ref}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${triggered ? "animate-fade-in-up" : ""}`}>
          {/* Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/about.png"
                alt="Inside Cozy Island Day Care"
                width={800}
                height={600}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 sm:-right-6 rounded-2xl bg-white p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-text">Safety First</p>
                  <p className="text-sm text-text-light">Always</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="mb-3 inline-block text-sm font-bold uppercase tracking-wider text-primary">Our Story</span>
            <h2 className="text-3xl font-bold text-text sm:text-4xl leading-tight">
              More Than a Daycare.{" "}
              <span className="text-primary">A Second Home.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-text-light">
              At Cozy Island Day Care, we believe every child deserves a place where they feel safe, loved, and inspired. Located in the heart of Lakewood, NJ, our center has been a trusted part of the community, serving families with care that goes beyond the ordinary.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-text-light">
              Our multilingual team speaks English, Spanish, Hebrew, and Yiddish, ensuring every family feels welcome. Safety, learning, and fun are our top priorities &mdash; because when children feel at home, they thrive.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: "shield", label: "NJ Licensed" },
                { icon: "heart", label: "Nurturing Care" },
                { icon: "globe", label: "4 Languages" },
                { icon: "users", label: "46 Staff Members" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 rounded-xl bg-white p-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <FeatureIcon name={item.icon} />
                  </div>
                  <span className="text-sm font-medium text-text">{item.label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollTo("#team")}
              className="mt-6 inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors"
            >
              Meet Our Team
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*              TEAM SECTION (SIGNATURE - FLIP CARDS)             */
/* ═══════════════════════════════════════════════════════════════ */

function TeamSection() {
  const { ref, triggered } = useInView();
  return (
    <section id="team" className="bg-white py-20 lg:py-28" ref={ref}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-3 inline-block text-sm font-bold uppercase tracking-wider text-primary">Meet Our Team</span>
          <h2 className="text-3xl font-bold text-text sm:text-4xl lg:text-5xl">
            The People Who <span className="text-primary">Care for Your Child</span>
          </h2>
          <p className="mt-4 text-lg text-text-light">
            Our experienced, passionate teachers create a warm and stimulating environment where every child is known, loved, and encouraged to grow.{" "}
            <span className="font-medium text-text">Tap a card to learn more.</span>
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((member, i) => (
            <TeamCard key={member.name} member={member} delay={i * 0.1} triggered={triggered} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({ member, delay, triggered }: { member: typeof TEAM[0]; delay: number; triggered: boolean }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`cursor-pointer ${triggered ? "animate-scale-in" : ""}`}
      style={{ animationDelay: `${delay}s`, perspective: "1000px" }}
      onClick={() => setFlipped(!flipped)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFlipped(!flipped); } }}
      role="button"
      tabIndex={0}
      aria-label={`Learn more about ${member.name}`}
    >
      <div
        className="relative w-full"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* FRONT */}
        <div className="rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow overflow-hidden" style={{ backfaceVisibility: "hidden" }}>
          <div className="flex flex-col items-center p-6 text-center">
            <div className="relative mb-4 h-36 w-36 overflow-hidden rounded-full ring-4 ring-primary/15">
              <Image src={member.image} alt={member.name} fill className="object-cover" sizes="144px" />
            </div>
            <h3 className="text-lg font-bold text-text">{member.name}</h3>
            <p className="mb-2 text-sm font-semibold text-primary">{member.role}</p>
            <div className="flex flex-wrap justify-center gap-1.5">
              {member.certs.map((cert) => (
                <span key={cert} className="text-xs bg-primary/8 text-primary px-2.5 py-0.5 rounded-full font-medium">{cert}</span>
              ))}
            </div>
            <p className="mt-3 text-xs text-text-light">Tap to learn more</p>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl bg-primary shadow-xl overflow-hidden flex flex-col items-center justify-center p-6 text-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="relative mb-3 h-20 w-20 overflow-hidden rounded-full border-3 border-white/30">
            <Image src={member.image} alt={member.name} fill className="object-cover" sizes="80px" />
          </div>
          <h3 className="text-lg font-bold text-white">{member.name}</h3>
          <p className="mb-3 text-sm font-medium text-accent-light">{member.role}</p>
          <p className="text-sm leading-relaxed text-white/90 mb-3">{member.bio}</p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {member.certs.map((cert) => (
              <span key={cert} className="text-xs bg-white/15 text-white px-2 py-0.5 rounded-full">{cert}</span>
            ))}
          </div>
          <p className="mt-3 text-xs text-white/50">Tap to flip back</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*                       PROGRAMS SECTION                         */
/* ═══════════════════════════════════════════════════════════════ */

function ProgramsSection({ scrollTo }: { scrollTo: (href: string) => void }) {
  const { ref, triggered } = useInView();
  return (
    <section id="programs" className="bg-light py-20 lg:py-28" ref={ref}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-3 inline-block text-sm font-bold uppercase tracking-wider text-primary">Our Programs</span>
          <h2 className="text-3xl font-bold text-text sm:text-4xl lg:text-5xl">
            Programs for Every <span className="text-accent">Age & Stage</span>
          </h2>
          <p className="mt-4 text-lg text-text-light">
            From infant care to after-school programs, we provide age-appropriate activities that foster growth, creativity, and a love of learning.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((program, i) => (
            <div
              key={program.title}
              className={`group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${triggered ? "animate-fade-in-up" : ""}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image src={program.image} alt={program.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-primary">{program.ages}</span>
              </div>
              <div className="p-5">
                <h3 className="mb-2 text-xl font-bold text-text">{program.title}</h3>
                <p className="text-sm leading-relaxed text-text-light mb-3">{program.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {program.features.map((f) => (
                    <span key={f} className="text-xs font-medium bg-primary/8 text-primary px-2.5 py-1 rounded-full">{f}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-text-light mb-4">Subsidized childcare (CCAP) accepted. Ask us about enrollment!</p>
          <button onClick={() => scrollTo("#contact")} className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5">
            Learn More About Our Programs
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*                        GALLERY SECTION                         */
/* ═══════════════════════════════════════════════════════════════ */

function GallerySection() {
  const { ref, triggered } = useInView();
  return (
    <section id="gallery" className="bg-white py-20 lg:py-28" ref={ref}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-3 inline-block text-sm font-bold uppercase tracking-wider text-primary">Our Facility</span>
          <h2 className="text-3xl font-bold text-text sm:text-4xl lg:text-5xl">
            A Space Designed for <span className="text-primary">Growing Minds</span>
          </h2>
          <p className="mt-4 text-lg text-text-light">Bright, clean, and thoughtfully designed rooms where children can learn, play, and explore safely.</p>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 ${triggered ? "animate-fade-in-up" : ""}`}>
          {GALLERY.map((img, i) => (
            <div key={img.src} className={`group overflow-hidden rounded-2xl shadow-md ${i === 0 ? "sm:row-span-2" : ""}`}>
              <div className={`relative ${i === 0 ? "h-64 sm:h-full min-h-[280px]" : "h-56 sm:h-64"}`}>
                <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-5">
                  <p className="text-white font-medium text-sm">{img.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*                     TESTIMONIALS SECTION                       */
/* ═══════════════════════════════════════════════════════════════ */

function TestimonialsSection() {
  const { ref, triggered } = useInView();
  return (
    <section id="testimonials" className="bg-cream py-20 lg:py-28" ref={ref}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-3 inline-block text-sm font-bold uppercase tracking-wider text-primary">Parent Reviews</span>
          <h2 className="text-3xl font-bold text-text sm:text-4xl lg:text-5xl">
            What <span className="text-accent">Families Say</span>
          </h2>
          <p className="mt-4 text-lg text-text-light">Don&apos;t just take our word for it &mdash; hear from the families who trust us with their most precious ones.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`relative rounded-2xl bg-white p-7 shadow-md transition-all duration-300 hover:shadow-lg ${triggered ? "animate-fade-in-up" : ""}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <svg className="absolute -top-3 left-6 h-10 w-10 text-accent/25" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <div className="mt-4">
                <div className="mb-4 flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-base leading-relaxed text-text/90 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 border-t border-accent/15 pt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <span className="font-bold text-primary text-sm">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-bold text-text text-sm">{t.name}</p>
                    <p className="text-xs text-text-light">{t.detail}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-sm">
            <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-semibold text-text">5.0 Rating on Google</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*                      LOCATION SECTION                          */
/* ═══════════════════════════════════════════════════════════════ */

function LocationSection() {
  const { ref, triggered } = useInView();
  return (
    <section id="location" className="bg-white py-20 lg:py-28" ref={ref}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-3 inline-block text-sm font-bold uppercase tracking-wider text-primary">Find Us</span>
          <h2 className="text-3xl font-bold text-text sm:text-4xl">
            Visit <span className="text-primary">Cozy Island</span>
          </h2>
        </div>

        <div className={`grid gap-8 lg:grid-cols-2 lg:gap-12 ${triggered ? "animate-fade-in-up" : ""}`}>
          <div className="rounded-2xl overflow-hidden shadow-lg h-80 lg:h-full min-h-[320px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3043.5!2d-74.217!3d40.098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c18b2d0f0a0001%3A0x1234567890!2s500+River+Ave%2C+Lakewood%2C+NJ+08701!5e0!3m2!1sen!2sus!4v1709000000000"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Cozy Island Day Care location"
            />
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl bg-light p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text mb-1">Our Location</h3>
                  <p className="text-text-light">{ADDRESS}</p>
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`} target="_blank" rel="noopener noreferrer" className="text-primary text-sm font-medium hover:underline mt-1 inline-block">
                    Get Directions
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-light p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
                  <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-text mb-3">Hours of Operation</h3>
                  <div className="space-y-2">
                    {HOURS.map((h) => (
                      <div key={h.day} className="flex justify-between">
                        <span className="text-text-light">{h.day}</span>
                        <span className={`font-medium ${h.time === "Closed" ? "text-accent-dark" : "text-text"}`}>{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-light p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text mb-1">Contact Us</h3>
                  <a href={PHONE_HREF} className="text-primary font-medium hover:underline block">{PHONE}</a>
                  <a href={`mailto:${EMAIL}`} className="text-primary font-medium hover:underline block text-sm mt-0.5">{EMAIL}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*                          CTA SECTION                           */
/* ═══════════════════════════════════════════════════════════════ */

function CTASection() {
  const { ref, triggered } = useInView();
  return (
    <section id="contact" className="relative overflow-hidden py-20 lg:py-28" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className={`relative z-10 mx-auto max-w-3xl px-5 text-center lg:px-8 ${triggered ? "animate-fade-in-up" : ""}`}>
        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white">
          <svg className="h-4 w-4 text-accent-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Currently Accepting New Enrollments
        </span>
        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">Schedule a Tour Today</h2>
        <p className="mt-5 text-lg leading-relaxed text-white/85 sm:text-xl">
          Come see for yourself why families choose Cozy Island. Walk through our classrooms, meet our teachers, and feel the warmth that makes us special.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={PHONE_HREF}
            className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-accent-dark hover:shadow-xl hover:-translate-y-0.5 sm:w-auto"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 01.97-.27 11.39 11.39 0 003.58.57 1 1 0 011.04 1v3.49a1 1 0 01-1.04 1A17 17 0 013 5.04 1 1 0 014.04 4h3.49a1 1 0 011 1.04c0 1.21.19 2.42.57 3.58a1 1 0 01-.27.97l-2.21 2.2z" />
            </svg>
            Call {PHONE}
          </a>
          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent("Tour Request - Cozy Island Day Care")}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/15 border border-white/20 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/25 sm:w-auto"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email Us
          </a>
        </div>
        <p className="mt-6 text-sm text-white/60">Or visit us at {ADDRESS}</p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*                           FOOTER                               */
/* ═══════════════════════════════════════════════════════════════ */

function FooterSection() {
  return (
    <footer className="bg-[#1a2332] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Image src="/images/logo.png" alt="Cozy Island Day Care" width={160} height={50} className="h-10 w-auto brightness-0 invert" />
            <p className="mt-4 text-sm leading-relaxed text-white/70">Where every child feels at home. A warm, safe, and nurturing childcare center proudly serving the Lakewood, NJ community.</p>
            <div className="mt-3 flex items-center gap-2 text-sm text-white/60">
              <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              NJ Licensed Childcare Center
            </div>
            <p className="text-xs text-white/40 mt-1">{LICENSE}</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-accent">Contact</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li><a href={PHONE_HREF} className="transition-colors hover:text-accent">{PHONE}</a></li>
              <li><a href={`mailto:${EMAIL}`} className="transition-colors hover:text-accent">{EMAIL}</a></li>
              <li className="text-white/60">{ADDRESS}</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-accent">Hours</h4>
            <ul className="space-y-2 text-sm text-white/80">
              {HOURS.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="font-medium text-white/90">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-accent">Quick Links</h4>
            <ul className="space-y-3 text-sm text-white/80">
              {NAV_LINKS.map((link) => (
                <li key={link.href}><a href={link.href} className="transition-colors hover:text-accent">{link.label}</a></li>
              ))}
              <li><a href="#contact" className="font-semibold text-accent transition-colors hover:text-accent-light">Schedule a Tour</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-white/50">&copy; {new Date().getFullYear()} Cozy Island Day Care. All rights reserved. {LICENSE}</p>
          <p className="mt-2 text-xs text-white/30">
            Website by{" "}
            <a href="https://maivenai.com" target="_blank" rel="noopener noreferrer" className="text-white/40 transition-colors hover:text-accent">Maiven</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*                        ICON COMPONENT                          */
/* ═══════════════════════════════════════════════════════════════ */

function FeatureIcon({ name }: { name: string }) {
  const cls = "h-5 w-5 text-primary";
  switch (name) {
    case "shield":
      return (<svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>);
    case "heart":
      return (<svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>);
    case "globe":
      return (<svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>);
    case "users":
      return (<svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>);
    default:
      return null;
  }
}
