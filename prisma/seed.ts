import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { Role } from "../generated/prisma/enums";

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

  const guests = [
    {
      slug: "ninong-juan-a8f3",
      name: "Juan Dela Cruz",
      role: Role.ninong,
      accessKey: "kp9m2x7q",
      personalMessage: "You have been like family to us for years.",
    },
    {
      slug: "ninang-maria-b2c1",
      name: "Maria Santos",
      role: Role.ninang,
      accessKey: "wn4k8p1r",
      personalMessage: "We can't imagine this journey without you.",
    },
    {
      slug: "tito-pedro-ghi789",
      name: "Pedro Reyes",
      role: Role.invitation_only,
      accessKey: "z0aa11bb22",
      personalMessage: null,
    },
  ];

  for (const g of guests) {
    await prisma.guest.upsert({
      where: { slug: g.slug },
      create: {
        slug: g.slug,
        name: g.name,
        role: g.role,
        accessKey: g.accessKey,
        personalMessage: g.personalMessage,
        qrGeneratedAt:
          g.role === Role.invitation_only ? null : new Date(),
      },
      update: {},
    });
  }

  // eslint-disable-next-line no-console
  console.log("Seeded event settings + 3 sample guests.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
