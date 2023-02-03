import { z } from "zod";
import {
  WizardDetailsSchema,
  WizardWeeksSchema,
} from "../../../types/ProgramTypes";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const programRouter = createTRPCRouter({
  getById: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.program.findUnique({
      where: {
        id: input,
      },
    });
  }),
  getAllByAuthor: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.program.findMany({
      where: {
        authorId: ctx.session.user.id,
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
          categories: input.categories,
          numWeeks: input.numWeeks,
          template: {},
        },
      });
    }),
  updateProgramDetails: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        schema: WizardDetailsSchema.pick({
          name: true,
          description: true,
          categories: true,
        }),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.program.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.schema.name,
          description: input.schema.description,
          categories: input.schema.categories,
        },
      });
    }),
  updateProgramTemplate: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        template: WizardWeeksSchema,
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.program.update({
        where: {
          id: input.id,
        },
        data: {
          template: input.template,
        },
      });
    }),
});
