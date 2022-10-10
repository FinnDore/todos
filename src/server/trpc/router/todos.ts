import { authedProcedure, t } from '../trpc';

export const todo = t.router({
    get: authedProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.todo.findMany({
            where: {
                userId: ctx.session.user.id,
            },
        });
    }),
});
