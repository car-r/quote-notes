import type { User, Quote, Book, Author, QuoteNote } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Quote, QuoteNote } from "@prisma/client";

export function getQuote({
    id,
    userId,
    }: Pick<Quote, "id"> & {
    userId: User["id"];
    }) {
    return prisma.quote.findFirst({
        where: { id, userId },
        include: {
            tag: true, // Return all fields
            author: true,
            book: true,
            note: {
                orderBy: [
                    {
                        createdAt: 'desc'
                    }
                ],
                
            }
        }
    });
}

export function getQuoteWithAuthorAndBook({
    id,
    userId,
    }: Pick<Quote, "id"> & {
    userId: User["id"];
    }) {
    return prisma.quote.findFirst({
        where: { id, userId },
        include: {
            author: true,
            book: true,
        }
    });
}

export function deleteQuote({
    id,
    userId,
}: Pick<Quote, "id"> & { userId: User["id"] }) {
    return prisma.quote.deleteMany({
      where: { id, userId },
    });
}

export function updateQuote({
    id,
    userId,
    body,
}: Pick<Quote, "id"> & { userId: User["id"], body: Quote["body"] }) {
    return prisma.quote.updateMany({
      where: { id, userId },
      data: {body}
    });
}

export function updateQuoteFavorite({
    id,
    userId,
    isFavorited,
}: Pick<Quote, "id"> & { userId: User["id"], isFavorited: Quote["isFavorited"] }) {
    return prisma.quote.updateMany({
      where: { id, userId },
      data: {isFavorited}
    });
}

export function getSortedQuotes({ userId }: { userId: User["id"] }) {
    return prisma.quote.findMany({
        where: { userId },
        orderBy: [
            {
                note: {
                    _count: 'desc'
                }
            },
            {
                createdAt: 'desc',
            },
        ],
        include: {
            tag: true, // Return all fields
            author: true,
            book: true,
        }
    });
}

export function createQuote({
    body,
    userId,
    authorId,
    bookId
}: Pick<Quote, "body"> & {
    userId: User["id"],
    authorId: Author["id"],
    bookId: Book["id"],
}) {
    return prisma.quote.create({
        data: {
            body,
            user: {
                connect: {
                    id: userId,
                },
            },
            book: {
                connect: {
                  id: bookId,
                },
            },
            author: {
                connect: {
                  id: authorId,
                },
            },
        }
    })
}

export function createQuoteNote({
    body,
    userId,
    quoteId,
    authorId,
    bookId
  }: Pick<QuoteNote, "body"> & {
    userId: User["id"],
    quoteId: Quote["id"],
    authorId: Author["id"],
    bookId: Book["id"],
  }) {
    return prisma.quoteNote.create({
      data: {
        body,
        user: {
          connect: {
            id: userId,
          },
        },
        book: {
            connect: {
              id: bookId,
            },
        },
        quote: {
            connect: {
              id: quoteId,
            },
        },
        author: {
            connect: {
              id: authorId,
            },
        },
      },
    });
  }