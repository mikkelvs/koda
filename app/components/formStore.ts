// app/components/useFormStore.ts
import { create } from "zustand";

export type FormData = {
  name: string;
  email: string;
  age: string;
  address: string;
};

export type FormState = {
  values: FormData;
  setValues: (values: Partial<FormState["values"]>) => void;
  reset: () => void;
};

export const useFormStore = create<FormState>((set) => ({
  values: {
    name: "",
    email: "",
    age: "",
    address: "",
  },
  setValues: (values) =>
    set((state) => ({ values: { ...state.values, ...values } })),
  reset: () =>
    set({
      values: { name: "", email: "", age: "", address: "" },
    }),
}));
