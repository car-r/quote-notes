import type { User, Quote, Book, Tag } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Quote, Tag } from "@prisma/client";

export function deleteTag({
    id,
    userId,
}: Pick<Tag, "id"> & { userId: User["id"], id: Tag["id"] }) {
    return prisma.tag.deleteMany({
      where: { id, userId },
    });
}

// export function deleteTag({
//     id,
// }: Pick<Tag, "id"> ) {
//     return prisma.tag.deleteMany({
//       where: { id },
//     });
// }

export function createTag({
    body,
    userId,
    quoteId,
    bookId
    }: Pick<Tag, "body"> & {
    userId: User["id"],
    quoteId: Quote["id"],
    bookId: Book["id"],
    }) {
    return prisma.tag.create({
        data: {
            body,
            user: {
            connect: {
                id: userId,
            },
            },
            quote: {
                connect: {
                id: quoteId,
                },
            },
            book: {
                connect: {
                id: bookId,
                },
            },
        },
    });
}

export function getTagsByGroup({ userId }: { userId: User["id"] }) {
    return prisma.tag.groupBy({
        where: { userId },
        by: ['body'],
        _count: true,
        orderBy: [{
            _count: {
                quoteId: 'desc'
            }
        }]
    });
}

export function getTagsWithQuotes({ userId }: { userId: User["id"]}) {
    return prisma.tag.findMany({
        where: { userId },
        include: {
            quote: true, // Return all fields
        }
    })
}