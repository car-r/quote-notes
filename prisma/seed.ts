import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";
  const email2 = 'test@test.com'

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);
  const hashedPassword2 = await bcrypt.hash("test1234", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: email2,
      password: {
        create: {
          hash: hashedPassword2,
        },
      },
    },
  });

  const author = await prisma.author.create({
    data: {
      firstName: "Robert",
      lastName: "K",
      userId: user.id
    }
  })

  const author2 = await prisma.author.create({
    data: {
      firstName: "Avery",
      lastName: "Carl",
      userId: user2.id
    }
  })

  const content = await prisma.content.create({
    data: {
      title: "Rich Dad Poor Dad",
      authorId: author.id,
      userId: user2.id
    }
  })

  const content2 = await prisma.content.create({
    data: {
      title: "Short-Term Rental, Long Term Wealth",
      authorId: author2.id,
      userId: user2.id
    }
  })

  await prisma.quote.create({
    data: {
      body: "Thinking that a job makes you secure is lying to yourself.",
      userId: user.id,
      authorId: author.id,
      contentId: content.id
    }
  })

  await prisma.quote.create({
    data: {
      body: "A job is really a short-term solution to a long-term problem",
      userId: user.id,
      authorId: author.id,
      contentId: content.id
    }
  })

  await prisma.quote.create({
    data: {
      body: "Most people fail to realize that in life, it's not how much money your make. It's how much money you keep.",
      userId: user.id,
      authorId: author.id,
      contentId: content.id
    }
  })

  await prisma.quote.create({
    data: {
      body: "Rich people acquire assets. The poor and middle class acquire liabilities they think are assets.",
      userId: user.id,
      authorId: author.id,
      contentId: content.id
    }
  })

  await prisma.quote.create({
    data: {
      body: "An asset puts money in my pocket. A liability takes money out of my pocket.",
      userId: user.id,
      authorId: author.id,
      contentId: content.id
    }
  })

  await prisma.quote.create({
    data: {
      body: "An intelligent person hires people who are more intelligent than he is.",
      userId: user.id,
      authorId: author.id,
      contentId: content.id
    }
  })

  await prisma.quote.create({
    data: {
      body: "With STRs, income potential will always be a range rather than an exact number.",
      userId: user2.id,
      authorId: author2.id,
      contentId: content2.id
    }
  })

  await prisma.quote.create({
    data: {
      body: "They will forget all about your gift basket if something doesn't go right or if they find a speck of dirt.",
      userId: user2.id,
      authorId: author2.id,
      contentId: content2.id
    }
  })

  await prisma.quote.create({
    data: {
      body: "The absolute biggest fear and worst-case scenario for any STR owner is a missed cleaning.",
      userId: user2.id,
      authorId: author2.id,
      contentId: content2.id
    }
  })

  await prisma.quote.create({
    data: {
      body: "Never post a listing more than fourteen days before you are ready for your first guest check-in.",
      userId: user2.id,
      authorId: author2.id,
      contentId: content2.id
    }
  })

  await prisma.quote.create({
    data: {
      body: "Go into your calendar and ensure that your three-day weekend and holiday rates are very high.",
      userId: user2.id,
      authorId: author2.id,
      contentId: content2.id
    }
  })

  await prisma.quote.create({
    data: {
      body: "The number one rule when evaluating the income potential of a specific property is to never take rental history at face value.",
      userId: user2.id,
      authorId: author2.id,
      contentId: content2.id
    }
  })


  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });




  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
