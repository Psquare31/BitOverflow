import Link from "next/link";
import {
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import Logo from "../ui/Logo";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/questions", label: "Questions" },
  { href: "/questions/ask", label: "Ask a Question" },
  { href: "/leaderboard", label: "Leaderboard" },
];

const campusLinks = [
  { href: "/club", label: "Clubs" },
  { href: "/events", label: "Events" },
  { href: "https://re-maps.vercel.app/", label: "Remap", external: true },
];

const socialLinks = [
  { href: "https://github.com/Psquare31/BitOverflow.git", label: "GitHub", icon: FaGithub },
  { href: "mailto:bitoverflow2@gmail.com", label: "Email", icon: FaEnvelope },
  { href: "https://www.instagram.com/live.psquare/", label: "Instagram", icon: FaInstagram },
];

const Footer = () => {
  return (
    <footer className="pt-16">
      <div className="glass-panel rounded-[32px] px-6 py-8 md:px-10 md:py-10">
        <div className="grid gap-10 xl:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
          <div className="space-y-5">
            <Logo />
            <p className="section-copy max-w-[48ch]">
              A focused digital commons for BIT Mesra where students can ask faster,
              discover campus opportunities, and stay close to the conversations that
              matter.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="chip">Forum</span>
              <span className="chip">Events</span>
              <span className="chip">Clubs</span>
              <span className="chip">Campus discovery</span>
            </div>
          </div>

          <div>
            <p className="mono-label">Explore</p>
            <div className="mt-4 grid gap-3">
              {exploreLinks.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </div>
          </div>

          <div>
            <p className="mono-label">Campus</p>
            <div className="mt-4 grid gap-3">
              {campusLinks.map((link) => (
                <FooterLink key={link.href} href={link.href} external={link.external}>
                  {link.label}
                </FooterLink>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <p className="mono-label">Support</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em]">
                Report an issue or say hello.
              </h3>
              <p className="mt-3 text-sm text-[var(--muted)]">
                Reach the team directly at{" "}
                <Link
                  href="mailto:bitoverflow2@gmail.com"
                  className="text-[var(--accent)] underline-offset-4 hover:underline"
                >
                  bitoverflow2@gmail.com
                </Link>
                .
              </p>
            </div>

            <div className="grid gap-3">
              <DeveloperLink
                name="Sumit Shekhar"
                linkedin="https://www.linkedin.com/in/sumit-shekhar72"
                email="mailto:mail.sumitshekhar@gmail.com"
              />
              <DeveloperLink
                name="Pranav Prajyot"
                linkedin="https://www.linkedin.com/in/pranav-prajyot-b297232a4"
                email="mailto:pranavprajyot31@gmail.com"
              />
            </div>
          </div>
        </div>

        <div className="soft-divider mt-8 flex flex-col gap-4 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-[var(--muted)]">
            © {new Date().getFullYear()} BitOverflow. Built for a calmer, smarter campus web.
          </p>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="glass-panel flex items-center gap-2 rounded-full px-4 py-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--text)]"
              >
                <item.icon size={14} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

type FooterLinkProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
};

const FooterLink = ({ href, children, external }: FooterLinkProps) => {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--text)]"
    >
      {children}
    </Link>
  );
};

type DeveloperLinkProps = {
  name: string;
  linkedin: string;
  email: string;
};

const DeveloperLink = ({ name, linkedin, email }: DeveloperLinkProps) => {
  return (
    <div className="glass-panel rounded-[22px] px-4 py-3">
      <p className="font-medium text-[var(--text)]">{name}</p>
      <div className="mt-3 flex gap-3 text-[var(--muted)]">
        <Link
          href={linkedin}
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-[var(--text)]"
          aria-label={`${name} on LinkedIn`}
        >
          <FaLinkedinIn size={15} />
        </Link>
        <Link
          href={email}
          className="transition-colors hover:text-[var(--text)]"
          aria-label={`Email ${name}`}
        >
          <FaEnvelope size={15} />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
