import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { Role } from "../generated/prisma/enums";
import { randomKey } from "../lib/tokens";

// Deterministic slug so re-seeding upserts the same rows (no random suffix).
function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  await prisma.eventSettings.upsert({
    where: { id: "singleton" },
    create: {
      id: "singleton",
      babyName: "Baby Hattie",
      parentNames: "Maria & Jose",
      christeningDateTime: new Date("2026-09-12T10:00:00+08:00"),
      churchName: "Our Lady of Grace Parish",
      churchAddress: "123 Chapel Road, Quezon City, Metro Manila",
      venueName: "The Garden Pavilion",
      venueAddress: "45 Rosewood Ave, Quezon City, Metro Manila",
      dressCode: "Semi-formal · Pastel colors welcome",
      thankYouNote:
        "Your love and prayers are the greatest gift to our little angel. Thank you for celebrating this blessed day with us.",
    },
    update: {},
  });

  // Godparents from the official baptism form (full names + roles).
  // "principal" godfather/godmother has no dedicated field in the schema,
  // so it's noted in personalMessage. Slug uses the full name.
  const godparents: {
    name: string;
    role: Role;
    personalMessage: string | null;
  }[] = [
    // Ninong (godfathers)
    {
      name: "Mikho Valencia",
      role: Role.ninong,
      personalMessage: "Principal Godfather",
    },
    { name: "Abcdef Crecensio", role: Role.ninong, personalMessage: null },
    { name: "Justine Compañero", role: Role.ninong, personalMessage: null },
    { name: "Job Juntura", role: Role.ninong, personalMessage: null },
    { name: "Michael Florendo", role: Role.ninong, personalMessage: null },
    { name: "Vince Balbaguio", role: Role.ninong, personalMessage: null },
    { name: "Cedric Bagalawis", role: Role.ninong, personalMessage: null },
    // Ninang (godmothers)
    {
      name: "Norie Manoc Ditan",
      role: Role.ninang,
      personalMessage: "Principal Godmother",
    },
    { name: "Gelina Ann Gasgonia", role: Role.ninang, personalMessage: null },
    { name: "Gemiela Ann", role: Role.ninang, personalMessage: null },
    { name: "Shaira Bravo", role: Role.ninang, personalMessage: null },
    { name: "Erika Crescini Terado", role: Role.ninang, personalMessage: null },
    { name: "Kate Carillo", role: Role.ninang, personalMessage: null },
    { name: "Natasha Esmalin", role: Role.ninang, personalMessage: null },
  ];

  // Remaining invited guests (not godparents), kept from the handwritten list.
  const ivorSide = [
    "Tita Ivy",
    "Tito Olan",
    "Sam",
    "Tita Grace",
    "Kuya Dranz",
    "Tita Jude",
    "Tita May",
    "Tito Jojo",
    "Tita Liz",
    "Tito Mike",
  ];
  const dyllanSide = [
    "Mama",
    "Kuya",
    "Ate Liam",
    "Tito Darwin",
    "Tita Fe",
    "Yuan",
    "Yuri",
    "Tito Marwin",
    "Tita Lyn",
    "Sarri",
    "Aba",
    "Dion",
    "Aya",
    "Mira",
    "Nanay",
    "Bles",
  ];

  const invited = [
    ...ivorSide.map((name) => ({ name, side: "ivor" })),
    ...dyllanSide.map((name) => ({ name, side: "dyllan" })),
  ];

  // Build the full desired guest set with stable slugs.
  const desired = [
    ...godparents.map((g) => ({
      slug: slugify(g.name),
      name: g.name,
      role: g.role,
      personalMessage: g.personalMessage,
    })),
    ...invited.map((g) => ({
      slug: `${g.side}-${slugify(g.name)}`,
      name: g.name,
      role: Role.invitation_only,
      personalMessage: null as string | null,
    })),
  ];

  for (const g of desired) {
    const isGodparent =
      g.role === Role.ninong || g.role === Role.ninang;
    await prisma.guest.upsert({
      where: { slug: g.slug },
      create: {
        slug: g.slug,
        name: g.name,
        role: g.role,
        personalMessage: g.personalMessage,
        accessKey: randomKey(),
        qrGeneratedAt: isGodparent ? new Date() : null,
      },
      // Sync name/role/message so re-seeding corrects promoted godparents.
      update: {
        name: g.name,
        role: g.role,
        personalMessage: g.personalMessage,
      },
    });
  }

  // Remove stale rows (e.g. old nickname entries now promoted to godparents).
  const keepSlugs = desired.map((g) => g.slug);
  const removed = await prisma.guest.deleteMany({
    where: { slug: { notIn: keepSlugs } },
  });

  // eslint-disable-next-line no-console
  console.log(
    `Seeded event settings + ${desired.length} guests ` +
      `(${godparents.length} godparents, ${invited.length} invited); ` +
      `removed ${removed.count} stale.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
