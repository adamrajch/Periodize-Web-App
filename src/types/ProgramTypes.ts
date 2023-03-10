import { z } from "zod";
export const RecordSchema = z.object({
  sets: z
    .number()
    .min(1, { message: "Minimum 1 set" })
    .max(100, { message: "maximum 100 sets" })
    .int({ message: "must be whole number" }),
  reps: z
    .number()
    .min(1, { message: "Minimum 1 set" })
    .max(100, { message: "maximum 100 sets" })
    .int({ message: "must be whole number" }),
  rpe: z
    .number()
    .min(1, { message: "RPE= 1-10" })
    .max(10, { message: "RPE = 1-10" })
    .multipleOf(0.5, { message: "Must be a multiple of 0.5" })
    .optional(),
  percent: z
    .number()
    .min(1, { message: "Must be between 1-100" })
    .max(100, { message: "Must be between 1-100" })
    .optional(),
  exerciseId: z.string().min(1),
  exerciseName: z.string(),
});

export type RecordSchemaType = z.infer<typeof RecordSchema>;

export const SingleRecord = z.object({
  sets: z
    .number()
    .min(1, { message: "Minimum 1 set" })
    .max(100, { message: "maximum 100 sets" })
    .int({ message: "must be whole number" }),
  reps: z
    .number()
    .min(1, { message: "Minimum 1 set" })
    .max(100, { message: "maximum 100 sets" })
    .int({ message: "must be whole number" }),
  rpe: z
    .number()
    .min(1, { message: "RPE= 1-10" })
    .max(10, { message: "RPE = 1-10" })
    .multipleOf(0.5, { message: "Must be a multiple of 0.5" })
    .optional(),
  percent: z
    .number()
    .min(1, { message: "Must be between 1-100" })
    .max(100, { message: "Must be between 1-100" })
    .optional(),
  status: z.literal("record"),
});

export type SingleRecordType = z.infer<typeof SingleRecord>;

export const SingleWorkout = z.object({
  exerciseId: z.string().min(1),
  name: z
    .string()
    .min(1, { message: "Minimum 1 set" })
    .max(20, { message: "Must be 20 or fewer characters long" }),
  type: z.literal("single"),
  load: z.boolean(),
  distance: z.boolean(),
  time: z.boolean(),
  records: z.array(RecordSchema),
});

export type SingleWorkoutType = z.infer<typeof SingleWorkout>;

export const ClusterWorkout = z.object({
  name: z
    .string()
    .min(1, { message: "Required" })
    .max(20, { message: "Must be 20 or fewer characters long" }),
  type: z.literal("cluster"),
  summary: z
    .string()
    .max(50, { message: "Must be 50 or fewer characters long" }),
  exercises: z.array(SingleWorkout),
  interval: z.number().optional(),
});

export type ClusterWorkoutType = z.infer<typeof ClusterWorkout>;

export const Workout = z.discriminatedUnion("type", [
  SingleWorkout,
  ClusterWorkout,
]);

export type WorkoutType = z.infer<typeof Workout>;

export const Day = z.object({
  name: z
    .string()
    .min(1, { message: "Required" })
    .max(20, { message: "Must be 20 or fewer characters long" }),
  summary: z
    .string()
    .max(50, { message: "Must be 50 or fewer characters long" }),
  workouts: z.array(Workout),
});

export const Week = z.object({
  name: z
    .string()
    .min(1, { message: "Required" })
    .max(20, { message: "Must be 20 or fewer characters long" }),
  summary: z
    .string()
    .max(50, { message: "Must be 50 or fewer characters long" }),
  days: z.array(Day),
});

export const ProgramCategories = z.array(
  z.union([
    z.literal("bodybuilding"),
    z.literal("powerlifting"),
    z.literal("olympic weightlifting"),
    z.literal("sport"),
  ])
);

export type ProgramCategoriesType = z.infer<typeof ProgramCategories>;

export const ProgramTemplateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(30, { message: "Must be 20 or fewer characters long" }),
  description: z
    .string()
    .trim()
    .max(50, { message: "Must be 50 or fewer characters" }),
  categories: ProgramCategories.nonempty({
    message: "Must chose atleast one discipline",
  }),
  numWeeks: z.number().int().positive().lt(16),
  weeks: z.array(Week),
});

export type ProgramTemplateSchemaType = z.infer<typeof ProgramTemplateSchema>;

export const WizardDetailsSchema = ProgramTemplateSchema.omit({
  weeks: true,
});

export const WizardWeeksSchema = ProgramTemplateSchema.pick({
  weeks: true,
});

const DayArray = z.array(Day);
export type DayArrayType = z.infer<typeof DayArray>;

export const WizardDaysSchema = z.object({
  days: DayArray,
});
export type WizardDaysFormType = z.infer<typeof WizardDaysSchema>;

export type WizardDetailsFormType = Omit<ProgramTemplateSchemaType, "weeks">;
export type WizardWeeksFormType = z.infer<typeof WizardWeeksSchema>;

export type WeekType = z.infer<typeof Week>;
export type DayType = z.infer<typeof Day>;
