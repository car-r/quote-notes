import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";
  const email2 = 'test@test.com';

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
      name: "Robert Kiyosaki",
      imgUrl: 'https://www.richdad.com/MediaLibrary/RichDad/Images/about/robert-kiyosaki/robert-office-desk-chewing-glasses-01.jpg',
      userId: user.id
    }
  })

   const author2 = await prisma.author.create({
    data: {
      name: "Avery Carl",
      imgUrl: "http://images.provenexpert.com/9d/42/464ba8067e8f65448e826f80b70b/the-short-term-shop-avery-carl-short-term-and-vacation-rental-acquisition-services_full_1600771316.jpg",
      userId: user2.id
    }
  })
  // const author2 = await prisma.author.create({
  //   data: {
  //     firstName: "Avery",
  //     lastName: "Carl",
  //     userId: user2.id
  //   }
  // })

  const content = await prisma.content.create({
    data: {
      title: "Rich Dad Poor Dad",
      imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/81bsw6fnUiL.jpg',
      authorId: author.id,
      authorName: 'Robert Kiyosaki',
      userId: user2.id
    }
  })

  const content2 = await prisma.content.create({
    data: {
      title: "Short-Term Rental, Long Term Wealth",
      imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/71HTaMhO1hL.jpg',
      authorId: author2.id,
      authorName: 'Avery Carl',
      userId: user2.id
    }
  })

  await prisma.quote.create({
    data: {
      body: "Thinking that a job makes you secure is lying to yourself.",
      authorName: 'Robert Kiyosaki',
      userId: user.id,
      authorId: author.id,
      contentId: content.id
    }
  })

  await prisma.quote.create({
    data: {
      body: "A job is really a short-term solution to a long-term problem.",
      authorName: 'Robert Kiyosaki',
      userId: user.id,
      authorId: author.id,
      contentId: content.id
    }
  })

  await prisma.quote.create({
    data: {
      body: "Most people fail to realize that in life, it's not how much money your make. It's how much money you keep.",
      authorName: 'Robert Kiyosaki',
      userId: user.id,
      authorId: author.id,
      contentId: content.id
    }
  })

  await prisma.quote.create({
    data: {
      body: "Rich people acquire assets. The poor and middle class acquire liabilities they think are assets.",
      authorName: 'Robert Kiyosaki',
      userId: user.id,
      authorId: author.id,
      contentId: content.id
    }
  })

  await prisma.quote.create({
    data: {
      body: "An asset puts money in my pocket. A liability takes money out of my pocket.",
      authorName: 'Robert Kiyosaki',
      userId: user.id,
      authorId: author.id,
      contentId: content.id
    }
  })

  await prisma.quote.create({
    data: {
      body: "An intelligent person hires people who are more intelligent than he is.",
      authorName: 'Robert Kiyosaki',
      userId: user.id,
      authorId: author.id,
      contentId: content.id
    }
  })

  await prisma.quote.create({
    data: {
      body: "With STRs, income potential will always be a range rather than an exact number.",
      authorName: 'Avery Carl',
      userId: user2.id,
      authorId: author2.id,
      contentId: content2.id
    }
  })

  await prisma.quote.create({
    data: {
      body: "They will forget all about your gift basket if something doesn't go right or if they find a speck of dirt.",
      authorName: 'Avery Carl',
      userId: user2.id,
      authorId: author2.id,
      contentId: content2.id
    }
  })

  await prisma.quote.create({
    data: {
      body: "The absolute biggest fear and worst-case scenario for any STR owner is a missed cleaning.",
      authorName: 'Avery Carl',
      userId: user2.id,
      authorId: author2.id,
      contentId: content2.id
    }
  })

  await prisma.quote.create({
    data: {
      body: "Never post a listing more than fourteen days before you are ready for your first guest check-in.",
      authorName: 'Avery Carl',
      userId: user2.id,
      authorId: author2.id,
      contentId: content2.id
    }
  })

  await prisma.quote.create({
    data: {
      body: "Go into your calendar and ensure that your three-day weekend and holiday rates are very high.",
      authorName: 'Avery Carl',
      userId: user2.id,
      authorId: author2.id,
      contentId: content2.id
    }
  })

  await prisma.quote.create({
    data: {
      body: "The number one rule when evaluating the income potential of a specific property is to never take rental history at face value.",
      authorName: 'Avery Carl',
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
