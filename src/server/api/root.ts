import { exampleRouter } from "./routers/example";
import { exerciseRouter } from "./routers/exercise";
import { programRouter } from "./routers/program";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  exercise: exerciseRouter,
  program: programRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
