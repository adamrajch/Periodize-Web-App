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
  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.program.delete({
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
  searchInfinitePrograms: protectedProcedure
    .input(
      z.object({
        query: z.string().min(1).max(40),
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 2;
      const { cursor } = input;

      const programs = await ctx.prisma.program.findMany({
        take: limit + 1,

        where: {
          OR: [
            {
              author: {
                name: {
                  contains: input.query,
                  mode: "insensitive",
                },
              },
              name: {
                contains: input.query,
                mode: "insensitive",
              },
              categories: {
                has: input.query,
              },
            },
          ],
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: "asc",
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (programs.length > limit) {
        const nextProgram = programs.pop();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        nextCursor = nextProgram!.id;
      }

      return {
        programs,
        nextCursor,
      };
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
          template: {
            weeks: [
              {
                name: "Week 1",
                summary: "",
                days: [
                  {
                    name: "sunday",
                    summary: "",
                    workouts: [],
                  },
                  {
                    name: "monday",
                    summary: "",
                    workouts: [],
                  },
                  {
                    name: "tuesday",
                    summary: "",
                    workouts: [],
                  },
                  {
                    name: "wednesday",
                    summary: "",
                    workouts: [],
                  },
                  {
                    name: "thursday",
                    summary: "",
                    workouts: [],
                  },
                  {
                    name: "friday",
                    summary: "",
                    workouts: [],
                  },
                  {
                    name: "saturday",
                    summary: "",
                    workouts: [],
                  },
                ],
              },
            ],
          },
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
