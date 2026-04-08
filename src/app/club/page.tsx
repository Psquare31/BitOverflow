"use client";
import React from "react";

import { HoverEffect } from "../../components/ui/card-hover-effect";
import Particles from "@/components/magicui/particles";

const page = () => {
  return (
    <div className="page-shell py-16">
      <Particles
        className="fixed inset-0 h-full w-full"
        quantity={90}
        ease={100}
        color="#8a8a8a"
        refresh
      />
      <div className="mb-10 max-w-4xl">
        <p className="mono-label">Campus communities</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.05em] text-[var(--text)]">
          Clubs at BIT Mesra
        </h1>
      </div>
      <div className="relative">
        <HoverEffect items={projects} />
      </div>
    </div>
  );
};

export default page;

const projects = [
  {
    title: "ACM",
    description:
      "A leading global organization for computing professionals and students. ACM fosters learning, innovation, and collaboration through workshops, coding contests, tech talks, and research opportunities.",
    link: "https://www.instagram.com/acmbitm/",
    image: "/ACMlogo.png",
  },
  {
    title: "IEEE",
    description:
      "The world’s largest technical professional organization dedicated to advancing technology. IEEE empowers students to innovate, learn, and connect through workshops, conferences, competitions, and cutting-edge projects.",
    link: "https://netflix.com",
    image: "/IEEElogo.png",
  },
  {
    title: "PSoc",
    description:
      "A creative community for photo enthusiasts to explore, learn, and capture moments. From workshops to photo walks and exhibitions, we bring stories to life through the lens.",
    link: "https://google.com",
    image: "/PSOClogo.png",
  },
  {
    title: "IET",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
    image: "/IETlogo.png",
  },
  {
    title: "Ehsaas",
    description:
      "The official social welfare club, Ehsaas is driven by compassion and action. We work to create meaningful change through community outreach, awareness drives, and service initiatives that reflect the true spirit of empathy.",
    link: "https://amazon.com",
    image: "/ehsaaslogo.png",
  },
  {
    title: "Robolution",
    description:
      "A robotics and automation club where innovation meets engineering. From building bots to competing in tech challenges, Robolution empowers students to design, code, and create the future of robotics.",
    link: "https://microsoft.com",
    image: "/robolutionlogo.png",
  },
  {
    title: "AeroSoc",
    description:
      "A student-led club dedicated to the world of aviation and aerospace. From model aircraft to aerodynamics and space tech, AeroSoc fuels curiosity through hands-on projects, workshops, and competitions.",
    link: "https://microsoft.com",
    image: "Aerosoclogo.png",
  },
  {
    title: "180 DC",
    description:
      "180DC is the world’s largest university-based consultancy, providing high-quality, socially conscious consulting services to nonprofits and social enterprises. It empowers students to create real impact by solving real-world challenges.",
    link: "https://microsoft.com",
    image: "/180DClogo.png",
  },
  {
    title: "Leo",
    description:
      "A youth wing of Lions Clubs International, Leo Club focuses on Leadership, Experience, and Opportunity. It empowers young people to serve the community, develop skills, and grow as future leaders through volunteer work and social initiatives.",
    link: "https://microsoft.com",
    image: "/LEOlogo.png",
  },
];

