import { z } from 'zod';
import { authedProcedure, t } from '../trpc';

export const todo = t.router({
    get: authedProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.todo.findMany({
            where: {
                userId: ctx.session.user.id,
            },
        });
    }),
    create: authedProcedure
        .input(
            z.object({
                title: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.todo.create({
                data: {
                    title: input.title,
                    userId: ctx.session.user.id,
                },
            });
        }),
    update: authedProcedure

        .input(
            z.object({
                id: z.string(),
                title: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.todo.update({
                where: {
                    id_userId: {
                        id: input.id,
                        userId: ctx.session.user.id,
                    },
                },
                data: {
                    title: input.title,
                },
            });
        }),
    delete: authedProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.todo.delete({
                where: {
                    id_userId: {
                        id: input.id,
                        userId: ctx.session.user.id,
                    },
                },
            });
        }),
});
