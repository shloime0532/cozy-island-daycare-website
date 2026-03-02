"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/* ───────────────────────────── DATA ───────────────────────────── */

const PHONE = "(732) 987-4411";
const PHONE_HREF = "tel:+17329874411";
const ADDRESS = "500 River Ave, Suite 100, Lakewood, NJ 08701";
const LICENSE = "NJ License #170800294";

const NAV_LINKS = [
  { label: "Programs", href: "#programs" },
  { label: "Our Team", href: "#team" },
  { label: "About", href: "#about" },
  { label: "Why Us", href: "#why-us" },
  { label: "Reviews", href: "#testimonials" },
];

const PROGRAMS = [
  {
    title: "Infant Care",
    ages: "6 Weeks – 18 Months",
    image: "/images/programs/infant.png",
    description:
      "Gentle, responsive care that nurtures your baby's earliest development. Our trained caregivers create a warm, stimulating environment with tummy time, sensory play, music, and one-on-one bonding that helps your little one thrive.",
  },
  {
    title: "Toddler Program",
    ages: "18 Months – 3 Years",
    image: "/images/programs/toddler.png",
    description:
      "An engaging world of discovery for curious toddlers. Through guided play, art, movement, and early language activities, we support your child's growing independence while keeping them safe and loved.",
  },
  {
    title: "Preschool",
    ages: "3 – 5 Years",
    image: "/images/programs/preschool.png",
    description:
      "Kindergarten-ready learning in a joyful setting. Our structured curriculum blends literacy, math, science, and creative arts to build confidence, social skills, and a genuine love of learning.",
  },
  {
    title: "After School",
    ages: "5 – 12 Years",
    image: "/images/programs/afterschool.png",
    description:
      "A safe, enriching space for school-age children. We offer homework help, STEM activities, outdoor play, and creative projects that keep kids engaged and excited until pickup time.",
  },
];

const TEAM = [
  {
    name: "Rachel Greenberg",
    role: "Center Director",
    image: "/images/team/director.png",
    bio: "With over 15 years in early childhood education, Rachel leads Cozy Island with warmth, vision, and an unwavering commitment to every child's success.",
  },
  {
    name: "Sarah Mitchell",
    role: "Lead Infant Teacher",
    image: "/images/team/teacher1.png",
    bio: "Sarah's gentle, patient approach creates a secure haven for our youngest learners. Parents love her daily updates and attentive care.",
  },
  {
    name: "Emily Torres",
    role: "Toddler Room Lead",
    image: "/images/team/teacher2.png",
    bio: "Emily brings creativity and energy to every day. Her sensory play stations and music time are toddler favorites.",
  },
  {
    name: "David Chen",
    role: "Preschool Teacher",
    image: "/images/team/teacher3.png",
    bio: "David makes learning an adventure. His STEM experiments and storytelling sessions spark curiosity in every preschooler.",
  },
  {
    name: "Maria Santos",
    role: "After School Coordinator",
    image: "/images/team/teacher4.png",
    bio: "Maria keeps school-age kids engaged with creative projects, homework support, and outdoor activities they look forward to every day.",
  },
  {
    name: "Linda Hoffman",
    role: "Nutrition & Wellness Lead",
    image: "/images/team/teacher5.png",
    bio: "Linda ensures every child receives balanced, delicious meals and snacks. She accommodates allergies and dietary needs with care.",
  },
];

const WHY_US = [
  {
    icon: "🛡️",
    title: "Licensed & Insured",
    description: "Fully licensed by the NJ Department of Children and Families. Your child's safety is guaranteed by state-level oversight.",
  },
  {
    icon: "🏠",
    title: "Safe Environment",
    description: "Secure entry systems, background-checked staff, and child-proofed facilities give you total peace of mind.",
  },
  {
    icon: "🥗",
    title: "Nutritious Meals",
    description: "Freshly prepared breakfasts, lunches, and snacks daily. We accommodate allergies and dietary requirements.",
  },
  {
    icon: "📚",
    title: "Structured Curriculum",
    description: "Age-appropriate learning that builds literacy, math, social skills, and creativity through play-based education.",
  },
  {
    icon: "👩‍🏫",
    title: "Experienced Staff",
    description: "46 dedicated professionals with early childhood certifications, CPR training, and a genuine love for children.",
  },
  {
    icon: "⏰",
    title: "Flexible Hours",
    description: "Open Monday–Thursday 8:30 AM – 4:15 PM and Friday 8:30 AM – 1:00 PM to fit your family's schedule.",
  },
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
      "We were nervous about leaving our infant at daycare, but the staff at Cozy Island made us feel completely at ease. They send us photos throughout the day and our son is thriving. Best decision we ever made.",
    name: "Daniel & Shira K.",
    detail: "Parents of 8-month-old",
  },
  {
    quote:
      "The preschool program prepared my son for kindergarten beyond my expectations. He's reading, doing basic math, and — most importantly — he's confident and happy. The teachers here truly care.",
    name: "Michelle T.",
    detail: "Parent of 5-year-old",
  },
];

const HOURS = [
  { day: "Monday – Thursday", time: "8:30 AM – 4:15 PM" },
  { day: "Friday", time: "8:30 AM – 1:00 PM" },
  { day: "Saturday – Sunday", time: "Closed" },
];

/* ──────────────── INTERSECTION OBSERVER HOOK ──────────────── */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
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

  // Close mobile menu on link click
  const handleNavClick = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* ═══════════════════ NAV ═══════════════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Cozy Island Day Care"
              width={180}
              height={60}
              className="h-12 w-auto lg:h-14"
              priority
            />
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-text transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#enroll"
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-accent-dark hover:shadow-lg hover:-translate-y-0.5"
            >
              Schedule a Tour
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-text md:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-gray-100 bg-white px-5 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="block py-3 text-base font-semibold text-text transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#enroll"
              onClick={handleNavClick}
              className="mt-3 block rounded-full bg-accent px-6 py-3 text-center text-base font-bold text-white shadow-md"
            >
              Schedule a Tour
            </a>
          </div>
        </div>
      </nav>

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-20">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero.png"
            alt="Happy children playing at Cozy Island Day Care"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Warm gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2D3748]/80 via-[#2D3748]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D3748]/40 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 lg:px-8">
          <div className="max-w-2xl">
            <div className="animate-fade-in-up">
              <span className="mb-4 inline-block rounded-full bg-accent/90 px-4 py-1.5 text-sm font-bold text-white">
                Now Enrolling for 2026
              </span>
            </div>
            <h1 className="animate-fade-in-up delay-100 mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Where Every Child{" "}
              <span className="text-accent-light">Feels at Home</span>
            </h1>
            <p className="animate-fade-in-up delay-200 mt-6 max-w-lg text-lg leading-relaxed text-white/90 sm:text-xl">
              A warm, safe, and nurturing childcare center in Lakewood, NJ.
              From infants to school-age children, we provide the love and
              learning your family deserves.
            </p>
            <div className="animate-fade-in-up delay-300 mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#enroll"
                className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-accent-dark hover:shadow-xl hover:-translate-y-0.5"
              >
                Schedule a Tour
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 01.97-.27 11.39 11.39 0 003.58.57 1 1 0 011.04 1v3.49a1 1 0 01-1.04 1A17 17 0 013 5.04 1 1 0 014.04 4h3.49a1 1 0 011 1.04c0 1.21.19 2.42.57 3.58a1 1 0 01-.27.97l-2.21 2.2z" />
                </svg>
                {PHONE}
              </a>
            </div>
            <div className="animate-fade-in-up delay-400 mt-6 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-semibold text-white/90">
                  Loved by Parents
                </span>
              </div>
              <div className="hidden h-5 w-px bg-white/30 sm:block" />
              <span className="hidden text-sm font-medium text-white/80 sm:block">
                Capacity: 172 Children
              </span>
            </div>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 120V60C240 20 480 0 720 20C960 40 1200 80 1440 60V120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ═══════════════════ PROGRAMS ═══════════════════ */}
      <ProgramsSection />

      {/* ═══════════════════ TEAM (SIGNATURE) ═══════════════════ */}
      <TeamSection />

      {/* ═══════════════════ ABOUT ═══════════════════ */}
      <AboutSection />

      {/* ═══════════════════ WHY CHOOSE US ═══════════════════ */}
      <WhyUsSection />

      {/* ═══════════════════ TESTIMONIALS ═══════════════════ */}
      <TestimonialsSection />

      {/* ═══════════════════ ENROLLMENT CTA ═══════════════════ */}
      <EnrollSection />

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <Footer />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*                        PROGRAMS SECTION                        */
/* ═══════════════════════════════════════════════════════════════ */

function ProgramsSection() {
  const { ref, isVisible } = useInView();
  return (
    <section id="programs" className="bg-white py-20 lg:py-28" ref={ref}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-3 inline-block text-sm font-bold uppercase tracking-wider text-accent">
            Our Programs
          </span>
          <h2 className="text-3xl font-extrabold text-text sm:text-4xl lg:text-5xl">
            Programs for Every <span className="text-primary">Age & Stage</span>
          </h2>
          <p className="mt-4 text-lg text-text-light">
            From your baby&apos;s first steps to homework help after school — we
            have a nurturing program designed for every stage of childhood.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROGRAMS.map((program, i) => (
            <div
              key={program.title}
              className={`group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
                isVisible
                  ? "animate-fade-in-up"
                  : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Image header */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white shadow-sm">
                  {program.ages}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="mb-2 text-xl font-bold text-text">
                  {program.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-light">
                  {program.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*                    TEAM SECTION (SIGNATURE)                    */
/* ═══════════════════════════════════════════════════════════════ */

function TeamSection() {
  const { ref, isVisible } = useInView();
  return (
    <section
      id="team"
      className="bg-light py-20 lg:py-28"
      ref={ref}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-3 inline-block text-sm font-bold uppercase tracking-wider text-accent">
            Meet Our Team
          </span>
          <h2 className="text-3xl font-extrabold text-text sm:text-4xl lg:text-5xl">
            The People Who{" "}
            <span className="text-primary">Care for Your Children</span>
          </h2>
          <p className="mt-4 text-lg text-text-light">
            Our 46-member team brings decades of combined experience, genuine
            warmth, and a deep commitment to your child&apos;s happiness and
            growth.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((member, i) => (
            <div
              key={member.name}
              className={`group rounded-2xl bg-white p-6 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
                isVisible
                  ? "animate-scale-in"
                  : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center">
                {/* Circular photo */}
                <div className="relative mb-4 h-32 w-32 overflow-hidden rounded-full ring-4 ring-primary/20 transition-all duration-300 group-hover:ring-accent/40">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="128px"
                  />
                </div>
                <h3 className="text-lg font-bold text-text">{member.name}</h3>
                <p className="mb-3 text-sm font-semibold text-primary">
                  {member.role}
                </p>
                <p className="text-sm leading-relaxed text-text-light">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*                        ABOUT SECTION                          */
/* ═══════════════════════════════════════════════════════════════ */

function AboutSection() {
  const { ref, isVisible } = useInView();
  return (
    <section id="about" className="bg-white py-20 lg:py-28" ref={ref}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div
          className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {/* Image */}
          <div className="relative overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="/images/about.png"
              alt="Cozy Island Day Care classroom"
              width={800}
              height={600}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Decorative badge */}
            <div className="absolute bottom-5 right-5 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur-sm">
              <p className="text-2xl font-extrabold text-primary">172</p>
              <p className="text-sm font-semibold text-text-light">
                Children Capacity
              </p>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="mb-3 inline-block text-sm font-bold uppercase tracking-wider text-accent">
              Our Story
            </span>
            <h2 className="text-3xl font-extrabold text-text sm:text-4xl">
              More Than a Daycare —{" "}
              <span className="text-primary">A Second Home</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-text-light">
              Cozy Island Day Care was founded with a simple belief: every child
              deserves a place where they feel safe, loved, and inspired to grow.
              Located on River Avenue in the heart of Lakewood, our center serves
              as a nurturing island where children can explore, learn, and
              blossom.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-text-light">
              With a team of 46 dedicated professionals and capacity for 172
              children, we provide individualized attention within a structured,
              play-based curriculum. Every meal is freshly prepared, every
              classroom is designed for discovery, and every staff member is
              committed to your child&apos;s happiness.
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-6">
              {[
                { number: "172", label: "Children" },
                { number: "46", label: "Staff Members" },
                { number: "6w+", label: "Ages Served" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-extrabold text-primary">
                    {stat.number}
                  </p>
                  <p className="mt-1 text-sm font-medium text-text-light">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*                      WHY CHOOSE US SECTION                    */
/* ═══════════════════════════════════════════════════════════════ */

function WhyUsSection() {
  const { ref, isVisible } = useInView();
  return (
    <section id="why-us" className="bg-light py-20 lg:py-28" ref={ref}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-3 inline-block text-sm font-bold uppercase tracking-wider text-accent">
            Why Families Choose Us
          </span>
          <h2 className="text-3xl font-extrabold text-text sm:text-4xl lg:text-5xl">
            The <span className="text-primary">Cozy Island</span> Difference
          </h2>
          <p className="mt-4 text-lg text-text-light">
            We go above and beyond to create an environment where children
            thrive and parents have complete peace of mind.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((item, i) => (
            <div
              key={item.title}
              className={`group rounded-2xl border border-primary/10 bg-white p-7 shadow-sm transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 ${
                isVisible
                  ? "animate-fade-in-up"
                  : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="mb-4 block text-4xl">{item.icon}</span>
              <h3 className="mb-2 text-lg font-bold text-text">{item.title}</h3>
              <p className="text-sm leading-relaxed text-text-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*                     TESTIMONIALS SECTION                      */
/* ═══════════════════════════════════════════════════════════════ */

function TestimonialsSection() {
  const { ref, isVisible } = useInView();
  return (
    <section
      id="testimonials"
      className="bg-white py-20 lg:py-28"
      ref={ref}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-3 inline-block text-sm font-bold uppercase tracking-wider text-accent">
            Parent Testimonials
          </span>
          <h2 className="text-3xl font-extrabold text-text sm:text-4xl lg:text-5xl">
            What Parents Are{" "}
            <span className="text-primary">Saying</span>
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, i) => (
            <div
              key={testimonial.name}
              className={`relative rounded-2xl bg-cream p-8 shadow-sm transition-all duration-300 hover:shadow-md ${
                isVisible
                  ? "animate-fade-in-up"
                  : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Quote mark */}
              <svg
                className="absolute -top-3 left-6 h-10 w-10 text-accent/30"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <div className="mt-4">
                {/* Stars */}
                <div className="mb-4 flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <svg
                      key={j}
                      className="h-5 w-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-base leading-relaxed text-text/90 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-5 border-t border-accent/20 pt-4">
                  <p className="font-bold text-text">{testimonial.name}</p>
                  <p className="text-sm text-text-light">
                    {testimonial.detail}
                  </p>
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
/*                       ENROLLMENT CTA                          */
/* ═══════════════════════════════════════════════════════════════ */

function EnrollSection() {
  const { ref, isVisible } = useInView();
  return (
    <section id="enroll" className="relative overflow-hidden py-20 lg:py-28" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div
        className={`relative z-10 mx-auto max-w-3xl px-5 text-center lg:px-8 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        <span className="mb-3 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold text-white">
          Limited Spots Available
        </span>
        <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
          Ready to Join the{" "}
          <span className="text-accent-light">Cozy Island</span> Family?
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-white/90">
          Come see what makes us special. Schedule a tour of our center and
          meet the caring team that will become your child&apos;s second family.
          Spaces fill up quickly — reach out today.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={PHONE_HREF}
            className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-accent-dark hover:shadow-xl hover:-translate-y-0.5 sm:w-auto"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 01.97-.27 11.39 11.39 0 003.58.57 1 1 0 011.04 1v3.49a1 1 0 01-1.04 1A17 17 0 013 5.04 1 1 0 014.04 4h3.49a1 1 0 011 1.04c0 1.21.19 2.42.57 3.58a1 1 0 01-.27.97l-2.21 2.2z" />
            </svg>
            Schedule a Tour: {PHONE}
          </a>
        </div>

        <p className="mt-6 text-sm text-white/70">
          Or visit us at {ADDRESS}
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*                           FOOTER                              */
/* ═══════════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="bg-[#1a2332] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/images/logo.png"
              alt="Cozy Island Day Care"
              width={160}
              height={50}
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              A warm, safe, and nurturing childcare center in Lakewood, NJ.
              Where every child feels at home.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-accent">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <a
                  href={PHONE_HREF}
                  className="transition-colors hover:text-accent"
                >
                  {PHONE}
                </a>
              </li>
              <li>{ADDRESS}</li>
              <li className="text-white/60">{LICENSE}</li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-accent">
              Hours
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              {HOURS.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="font-medium text-white/90">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-accent">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-white/80">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#enroll"
                  className="font-semibold text-accent transition-colors hover:text-accent-light"
                >
                  Schedule a Tour
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} Cozy Island Day Care. All rights
            reserved. {LICENSE}
          </p>
          <p className="mt-2 text-xs text-white/30">
            Website by{" "}
            <a
              href="https://maivenai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 transition-colors hover:text-accent"
            >
              Maiven
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
