import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const exerciseSchema = z.object({
  name: z.string(),
  load: z.boolean(),
  time: z.boolean(),
  distance: z.boolean(),
  userId: z.string(),
  categories: z.array(
    z.union([
      z.literal("bodybuilding"),
      z.literal("powerlifting"),
      z.literal("olympic weightlifting"),
      z.literal("sport"),
    ])
  ),
});

export const exerciseRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.exercise.findMany();
  }),

  deleteById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      // delete the exercise if it belongs to user

      // if the exercise is admin created, must be deleted by admin

      return ctx.prisma.exercise.delete({
        where: {
          id: input.id,
        },
      });
    }),

  createExercise: protectedProcedure
    .input(exerciseSchema.omit({ userId: true }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.exercise.create({
        data: {
          distance: input.distance,
          name: input.name,
          load: input.load,
          time: input.time,
        },
      });
    }),

  createUserExercise: protectedProcedure
    .input(exerciseSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.exercise.create({
        data: {
          distance: input.distance,
          name: input.name,
          load: input.load,
          time: input.time,
          user: {
            create: [
              {
                assignedBy: input.userId,
                assignedAt: new Date(),
                user: {
                  connect: {
                    id: input.userId,
                  },
                },
              },
            ],
          },
        },
      });
    }),
  searchUserAndPublicExercises: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.exercise.findMany({
        where: {
          name: {
            contains: input.query,
          },

          OR: [
            {
              user: {
                some: {
                  assignedBy: ctx.session.user.id,
                },
              },
            },
            {
              user: {
                none: {},
              },
            },
          ],
        },
        orderBy: [
          {
            name: "asc",
          },
        ],
        take: 10,
      });
    }),
});
