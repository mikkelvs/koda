// app/form/[step]/page.tsx
"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { StepKey, stepSchemas } from "@/app/components/validation";
import { useFormStore, FormData } from "@/app/components/formStore";
import FormLayout from "@/app/components/FormLayout";
import { use, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import ErrorLabel from "../components/ErrorLabel/ErrorLabel";
import { IsrcLookupResponse } from "../sharedTypes";
import ProgressBarIndicator from "../components/ProgressBarIndicator/ProgressBarIndicator";

const stepOrder = ["step1", "step2", "step3", "step4"];

type StepParams = {
  step: StepKey & "step4";
};

export default function StepPage(props: {
  params: Promise<StepParams>;
}): React.JSX.Element {
  const router = useRouter();
  const { step } = use(props.params);
  const { values, isrcData, setValues, setIsrcData, reset } = useFormStore();
  const [loading, setLoading] = useState(false);
  const currentStep: StepKey = step;
  const stepIndex = stepOrder.indexOf(currentStep);
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === stepOrder.length - 2;

  if (stepIndex === -1) return <div>Ugyldig værdi</div>;

  const goToStep = (index: number) => {
    router.push(`/${stepOrder[index]}`);
  };

  const handleSubmit = async (val: FormData) => {
    setValues(val);

    if (stepIndex < 2) setIsrcData(null);

    if (stepIndex === 0) goToStep(stepIndex + 1);

    if (stepIndex === 1) {
      setLoading(true);

      try {
        const res = await fetch(`/api/isrc/${val.name}`);
        if (!res.ok) throw new Error("Kunne ikke hente ISRC data");
        const data: IsrcLookupResponse = await res.json();
        setIsrcData(data);
        goToStep(stepIndex + 1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (stepIndex === 2) {
      setLoading(true);

      try {
        await fetch("/api/nmp/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(val),
        });

        goToStep(stepIndex + 1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <FormLayout step={stepIndex + 1}>
      <ProgressBarIndicator totalSteps={3} currentStep={stepIndex + 1} />
      <Formik
        initialValues={values}
        validationSchema={stepSchemas[currentStep]}
        enableReinitialize
        onSubmit={(val) => handleSubmit(val)}
      >
        <Form>
          {currentStep === "step1" && (
            <>
              <h2>Dine kontaktoplysninger</h2>
              <p className="mb-2">
                Vi bruger oplysningerne til at kontakte dig vedrørende din
                registrering, hvis det bliver nødvendigt.
              </p>
              <label>Navn</label>
              <Field name="name" as={Input} />
              <ErrorMessage
                name="name"
                render={(msg) => <ErrorLabel>{msg}</ErrorLabel>}
              />
              <label>E-mail</label>
              <Field name="email" as={Input} />
              <ErrorMessage
                name="email"
                render={(msg) => <ErrorLabel>{msg}</ErrorLabel>}
              />
            </>
          )}

          {currentStep === "step2" && (
            <>
              <h2>Oplysninger om dit covernummer</h2>
              <label>ISRC</label>
              <Field name="isrcNumber" as={Input} maxLength="10" />
              <ErrorMessage
                name="isrcNumber"
                render={(msg) => <ErrorLabel>{msg}</ErrorLabel>}
              />
              <label>Dit artistnavn</label>
              <Field name="artistName" as={Input} />
              <ErrorMessage
                name="artistName"
                render={(msg) => <ErrorLabel>{msg}</ErrorLabel>}
              />
            </>
          )}

          {currentStep === "step3" && (
            <>
              {isrcData !== null && (
                <div className="bg-blue-100 p-4 mb-4 rounded-2xl">
                  <h3 className="mb-2">
                    Du har valgt værket "{isrcData.title}"
                  </h3>

                  <p className="mb-2">
                    <strong>Titel</strong>
                    <br />
                    {isrcData.title}
                  </p>
                  <p className="mb-2">
                    <strong>Værknummer</strong>
                    <br />
                    {isrcData.trackNumber}
                  </p>
                  <p className="mb-2">
                    <strong>Komponister / forfatter</strong>
                    <br />
                    {isrcData.composers.join(", ")}
                  </p>
                  <p className="mb-2">
                    <strong>Arrangør</strong>
                    <br />
                    {isrcData.arranger}
                  </p>
                  <p className="mb-2">
                    <strong>Tekstforfatter</strong>
                    <br />
                    {isrcData.author}
                  </p>
                </div>
              )}
              <label>Indsæt et link til originalværket</label>
              <Field name="link" as={Input} />
              <ErrorMessage
                name="link"
                render={(msg) => <ErrorLabel>{msg}</ErrorLabel>}
              />
            </>
          )}

          {currentStep === "step4" && (
            <>
              <h3>Tak for din registrering</h3>
              <p>Data er sendt til NMP.</p>
              <Button
                onClick={() => {
                  reset();
                  router.push("/");
                }}
                className="mt-8"
              >
                Tilbage til start
              </Button>
            </>
          )}
          {/* Buttons */}
          {stepIndex < 3 && (
            <div className="flex justify-between pt-8">
              <Button
                type="button"
                onClick={() => {
                  // setValues(formikValues);
                  goToStep(stepIndex - 1);
                  setIsrcData(null);
                }}
                disabled={isFirst}
              >
                Forrige
              </Button>

              {!isLast ? (
                <Button type="submit">Næste {loading && <Spinner />}</Button>
              ) : (
                <Button type="submit" className="text-green-500">
                  Indsend {loading && <Spinner />}
                </Button>
              )}
            </div>
          )}
        </Form>
      </Formik>
    </FormLayout>
  );
}
