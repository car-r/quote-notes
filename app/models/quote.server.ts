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