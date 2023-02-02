import { z } from "zod";
import { WizardDetailsSchema } from "../../../types/ProgramTypes";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const programRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.program.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  createProgram: protectedProcedure
    .input(WizardDetailsSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.program.create({
        data: {
          authorId: ctx.session.user.id,
          name: input.name,
          categories: input.category,
          numWeeks: input.numWeeks,
          template: {},
        },
      });
    }),
});
