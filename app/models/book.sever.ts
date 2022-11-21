import type { User, Quote, Book, Tag } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Quote, Tag, Book } from "@prisma/client";

export function getBook({
    id,
    userId,
    }: Pick<Book, "id"> & {
    userId: User["id"];
    }) {
    return prisma.book.findFirst({
        where: { id, userId },
        include: {
            author: true,
            tag: true,
            quote: {
                where: {userId: userId},
                orderBy: [
                    {
                        createdAt: 'desc'
                    }
                ]
            }
        }
    });
}