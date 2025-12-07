// app/components/useFormStore.ts
import { create } from "zustand";
import { IsrcLookupResponse } from "../sharedTypes";

export type FormData = {
  name: string;
  email: string;
  isrcNumber: string | null;
  artistName: string;
  link: string;
};

export type FormState = {
  values: FormData;
  isrcData: IsrcLookupResponse | null;
  setValues: (values: Partial<FormState["values"]>) => void;
  setIsrcData: (value: IsrcLookupResponse | null) => void;
  reset: () => void;
};

export const useFormStore = create<FormState>((set) => ({
  values: {
    name: "",
    email: "",
    isrcNumber: "",
    artistName: "",
    link: "",
  },
  isrcData: null,
  setValues: (values) =>
    set((state) => ({ values: { ...state.values, ...values } })),
  setIsrcData: (value) => set({ isrcData: value }),
  reset: () =>
    set({
      values: {
        name: "",
        email: "",
        isrcNumber: "",
        artistName: "",
        link: "",
      },
    }),
}));
