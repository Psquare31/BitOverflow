import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="glass-panel flex h-12 w-12 items-center justify-center overflow-hidden rounded-[18px] border-white/50">
        <Image
          src="/logo.png"
          alt="BitOverflow logo"
          width={40}
          height={40}
          className="h-10 w-10 object-contain"
        />
      </div>
      <div className="leading-none">
        <span className="mono-label block text-[10px] text-[var(--soft)]">
          Campus knowledge network
        </span>
        <span className="block text-xl font-extrabold tracking-[-0.05em] text-[var(--text)] sm:text-2xl">
          BitOverflow
        </span>
      </div>
    </Link>
  );
};

export default Logo;
