import Link from "next/link";
import { Sparkles } from "@/components/Sparkles";
import { HeartIcon, SparkleIcon } from "@/components/icons";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col items-center justify-center px-6 text-center">
      <section className="relative w-full overflow-hidden rounded-clay-lg bg-gradient-to-b from-white/70 to-blush-soft/60 px-6 py-14 shadow-[0_24px_60px_-30px_rgba(214,31,117,0.45)]">
        <Sparkles />
        <div className="relative">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-rose-deep shadow ring-2 ring-blush">
            <HeartIcon
              width={32}
              height={32}
              style={{ fill: "var(--color-blush)", stroke: "var(--color-rose-deep)" }}
            />
          </div>
          <p className="font-body text-sm font-bold uppercase tracking-[0.2em] text-lavender-deep">
            A Christening Celebration
          </p>
      
          <div className="mt-8 flex items-center justify-center gap-2 text-gold-deep">
            <SparkleIcon
              width={18}
              height={18}
              style={{ fill: "var(--color-gold)", stroke: "var(--color-gold-deep)" }}
            />
            <span className="font-display text-sm font-semibold">
              Made with love
            </span>
          </div>
        </div>
      </section>

     
    </main>
  );
}
