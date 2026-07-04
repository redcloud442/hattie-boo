import type { EventSettingsModel } from "@/generated/prisma/models";
import type { Guest } from "@/lib/guests";
import { Confetti } from "@/components/Confetti";
import { FairytaleBackground } from "@/components/FairytaleBackground";
import { MapCard } from "@/components/MapCard";
import { MusicToggle } from "@/components/MusicToggle";
import { RsvpModal } from "@/components/RsvpModal";
import { Bunting, HangingCloud, RainbowArch, StarField } from "@/components/decor";
import {
  ChurchIcon,
  HeartIcon,
  PartyIcon,
  SparkleIcon,
} from "@/components/icons";
import { getDateParts, roleLabel } from "@/lib/format";

function DateRow({
  weekday,
  month,
  day,
  year,
  time,
}: ReturnType<typeof getDateParts>) {
  return (
    <div className="mx-auto mt-4 flex w-fit items-center gap-3 text-rose-deep sm:gap-4">
      <span className="text-sm font-bold uppercase tracking-[0.15em] sm:text-base">
        {weekday}
      </span>
      <span className="h-9 w-0.5 rounded bg-rose/40" />
      <span className="text-center leading-none">
        <span className="block text-[11px] font-bold uppercase tracking-wide text-lavender-deep">
          {month}
        </span>
        <span className="font-display text-2xl font-bold">{day}</span>
        <span className="block text-[11px] font-semibold text-ink-soft">
          {year}
        </span>
      </span>
      <span className="h-9 w-0.5 rounded bg-rose/40" />
      <span className="text-sm font-bold uppercase tracking-[0.1em] sm:text-base">
        {time}
      </span>
    </div>
  );
}

function LocationCard({
  icon,
  eyebrow,
  name,
  address,
  chip,
  mapAddress,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  name: string;
  address: string;
  chip?: string | null;
  mapAddress: string;
}) {
  return (
    <div className="flex flex-col rounded-clay border-2 border-white bg-white/75 p-4 shadow-[0_16px_36px_-22px_rgba(214,31,117,0.4)] backdrop-blur">
      <div className="text-center">
        <span className="mx-auto mb-1 flex h-9 w-9 items-center justify-center rounded-full bg-blush-soft text-rose-deep">
          {icon}
        </span>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-lavender-deep">
          {eyebrow}
        </p>
        <h3 className="font-script text-2xl leading-tight text-rose-deep">
          {name}
        </h3>
        <p className="mt-1 text-xs uppercase tracking-wide text-ink-soft">
          {address}
        </p>
        {chip && (
          <p className="mx-auto mt-2 inline-block rounded-full bg-lavender px-3 py-1 text-sm font-semibold text-ink">
            {chip}
          </p>
        )}
      </div>
      <div className="mt-3">
        <MapCard address={mapAddress} label={name} compact />
      </div>
    </div>
  );
}

export function GuestInvitation({
  settings,
  guest,
  mode,
}: {
  settings: EventSettingsModel;
  guest: Guest;
  mode: "godparent" | "general";
}) {
  const parts = getDateParts(settings.christeningDateTime);
  const isGodparent = mode === "godparent";

  return (
    <main className="relative z-0 mx-auto w-full max-w-7xl px-4 pb-16 pt-4 sm:px-6">
      <FairytaleBackground />
      <StarField />
      <Confetti />
      <MusicToggle />

      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden rounded-clay-lg h-full border-2 border-white bg-gradient-to-b from-white/85 via-white/70 to-blush-soft/70 px-4 pb-9 pt-3 text-center shadow-[0_28px_64px_-32px_rgba(214,31,117,0.5)] sm:px-8">
        <Bunting className="mx-auto h-8 w-full max-w-md" />
        <HangingCloud className="absolute -left-2 top-6 w-24 opacity-90" />
        <HangingCloud className="absolute -right-2 top-6 w-24 opacity-90" flip />

        <div className="relative">
          {isGodparent && (
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-1 text-xs font-bold text-ink shadow">
            
              For our beloved {roleLabel(guest.role)}
            </span>
          )}

          <p className="text-xs font-bold uppercase tracking-[0.28em] text-lavender-deep sm:text-sm">
            You&rsquo;re invited to celebrate
          </p>

          {/* Rainbow-framed baby photo */}
          <div className="relative mx-auto mt-4 h-60 w-60 sm:h-60 sm:w-60">
            <RainbowArch
              className="absolute -top-6 left-1/2 -translate-x-1/2"
              width={300}
            />
            <div className="absolute inset-0 overflow-hidden rounded-full border-[5px] border-white bg-gradient-to-br from-blush-soft to-lavender shadow-lg">
              {settings.heroImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={settings.heroImageUrl}
                  alt={settings.babyName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center text-lavender-deep">
                  <SparkleIcon
                    width={40}
                    height={40}
                    style={{ fill: "var(--color-gold)", stroke: "var(--color-gold-deep)" }}
                  />
                  <span className="mt-1 font-display text-xs">baby photo</span>
                </div>
              )}
            </div>
          </div>

          <h1 className="font-script mt-4 text-5xl leading-none text-rose-deep sm:text-6xl">
            {settings.babyName}
          </h1>
          <p className="mt-1.5 font-display text-sm font-semibold uppercase tracking-[0.22em] text-ink">
            Holy Christening
          </p>

          <DateRow {...parts} />

       
        </div>
        {isGodparent ? (
        <section id="rsvp" className="mt-6 scroll-mt-4">
        
          <p className="mx-auto mb-4 max-w-md text-center text-ink-soft">
            We would be so blessed to have you with us. Kindly let us know if you
            can make it.
          </p>
          <div className="flex justify-center">
            <RsvpModal
              slug={guest.slug}
              accessKey={guest.accessKey}
              role={guest.role}
              name={guest.name}
              initialStatus={guest.rsvpStatus}
              initialCompanions={guest.companionCount}
              initialMessage={guest.guestMessage}
              alreadyResponded={Boolean(guest.respondedAt)}
            />
          </div>
        </section>
      ) : (
        <p className="mx-auto mt-5 max-w-md rounded-clay border-2 border-white bg-white/70 px-5 py-3.5 text-center text-sm text-ink-soft backdrop-blur">
          Kindly confirm your attendance directly with the family. We can&rsquo;t
          wait to celebrate with you!
        </p>
      )}
      </section>

      {/* --------------- Greeting --------------- */}
      <section className="mt-5 rounded-clay border-2 border-white bg-white/70 p-5 text-center backdrop-blur">
        <HeartIcon
          width={24}
          height={24}
          className="mx-auto mb-1.5"
          style={{ fill: "var(--color-blush)", stroke: "var(--color-rose-deep)" }}
        />
        {isGodparent ? (
          <div className="space-y-3 text-ink">
            <p className="leading-relaxed">
              Dear{" "}
              <span className="font-script text-xl text-rose-deep">
                {guest.name}
              </span>
              ,
            </p>
            <p className="leading-relaxed">
              Thank you for celebrating this special day with Mommy, Daddy, and
              me. Your love and prayers mean so much to our little family, and
              we&rsquo;re so thankful to have you beside us as I take this first
              step in my faith.
            </p>
         
      
            <p className="text-sm italic text-ink-soft">
              P.S. I heard godparents give the best gifts!
            </p>
            <p className="leading-relaxed">Love,</p>
            <p className="font-script text-4xl text-rose-deep">
              {settings.babyName}
            </p>
          </div>
        ) : (
          <p className="leading-relaxed text-ink">
            Dear{" "}
            <span className="font-script text-xl text-rose-deep">
              {guest.name}
            </span>
            , you&rsquo;re warmly invited to share in our joy as we celebrate{" "}
            {settings.babyName}&rsquo;s christening.
          </p>
        )}
        {/* {guest.personalMessage && (
          <p className="mt-3 rounded-2xl bg-blush-soft px-4 py-2.5 text-sm italic text-ink-soft">
            &ldquo;{guest.personalMessage}&rdquo;
          </p>
        )} */}
        <footer className="mt-8 text-center">
      
        {/* <p className="mx-auto mt-3 max-w-md text-sm text-ink-soft">
          {settings.thankYouNote}
        </p> */}
        {/* <p className="font-script mt-3 text-2xl text-rose-deep">
          {settings.parentNames}
        </p> */}
        {/* <p className="mt-0.5 text-xs text-ink-soft">with love &amp; gratitude</p> */}
      </footer>
      </section>

      {/* --------------- Ceremony + Celebration (2-up) --------------- */}
      <section id="details" className="mt-5 grid gap-4 sm:grid-cols-2">
        <LocationCard
          icon={<ChurchIcon width={20} height={20} />}
          eyebrow="The Ceremony"
          name={settings.churchName}
          address={settings.churchAddress}
          chip={parts.time}
          mapAddress={settings.churchAddress}
        />
        <LocationCard
          icon={<PartyIcon width={20} height={20} />}
          eyebrow="The Celebration"
          name={settings.venueName}
          address={settings.venueAddress}
          chip={settings.dressCode}
          mapAddress={settings.venueAddress}
        />
      </section>

  
    </main>
  );
}
