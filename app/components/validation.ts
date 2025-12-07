import * as Yup from "yup";

export type StepKey = "step1" | "step2" | "step3" | "step4";

export const stepSchemas = {
  step1: Yup.object({
    name: Yup.string().required("Name required"),
  }),
  step2: Yup.object({
    email: Yup.string().email("Invalid").required("Email required"),
  }),
  step3: Yup.object({
    age: Yup.number().min(1).required("Age required"),
  }),
  step4: Yup.object({
    address: Yup.string().required("Address required"),
  }),
} as const;

export type StepSchemas = typeof stepSchemas;
export type StepSchemaValues<K extends StepKey> = Yup.InferType<StepSchemas[K]>;
