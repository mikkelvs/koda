import * as Yup from "yup";

export type StepKey = "step1" | "step2" | "step3";

export const stepSchemas = {
  step1: Yup.object({
    name: Yup.string().required("Udfyld venligst dit navn"),
    email: Yup.string()
      .email("Ikke en gyldig e-mail adresse")
      .required("Udfyld venligst din e-mail"),
  }),
  step2: Yup.object({
    isrcNumber: Yup.number().required("Udfyld venligst ISRC nummer"),
    artistName: Yup.string().required("Udfyld venligst dit artistnavn"),
  }),
  step3: Yup.object({
    link: Yup.string()
      .min(1)
      .required("Udfyld venligst et link til originalværket"),
  }),
} as const;

export type StepSchemas = typeof stepSchemas;
export type StepSchemaValues<K extends StepKey> = Yup.InferType<StepSchemas[K]>;
