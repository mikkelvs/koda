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
import { UserResponse } from "../api/coversongs/[id]/route";

const stepOrder = ["step1", "step2", "step3", "step4"];

type StepParams = {
  step: StepKey;
};

export default function StepPage(props: {
  params: Promise<StepParams>;
}): React.JSX.Element {
  const router = useRouter();
  const { step } = use(props.params);
  const currentStep: StepKey = step;
  const { values, setValues } = useFormStore();
  const [loading, setLoading] = useState(false);

  const stepIndex = stepOrder.indexOf(currentStep);
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === stepOrder.length - 1;

  if (stepIndex === -1) return <div>Invalid step</div>;

  const goToStep = (index: number) => {
    router.push(`/${stepOrder[index]}`);
  };

  const handleSubmit = async (val: FormData) => {
    setValues(val);

    console.log(stepIndex);

    if (stepIndex === 1) {
      setLoading(true);

      try {
        const res = await fetch(`/api/coversongs/${val.name}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        const data: UserResponse = await res.json();
        console.log(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (!isLast) goToStep(stepIndex + 1);
    else {
      try {
        const res = await fetch("/api/nmp/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(val),
        });

        const data = await res.json();
        console.log("Response:", data);
        alert(JSON.stringify(data));
      } catch (err) {
        console.error(err);
      }

      //   try {
      //     const res = await fetch("/api/nmp/submit");
      //     if (!res.ok) throw new Error("Failed to fetch user");
      //     const data: UserResponse = await res.json();
      //     console.log(data);
      //     //   alert("Form complete! Values: " + JSON.stringify(val, null, 2));
      //     alert(data);
      //   } catch (err) {
      //     console.error(err);
      //   } finally {
      //     setLoading(false);
      //   }
    }
  };

  return (
    <FormLayout step={stepIndex + 1}>
      <Formik
        initialValues={values}
        validationSchema={stepSchemas[currentStep]}
        enableReinitialize
        onSubmit={(val) => handleSubmit(val)}
      >
        <Form>
          {/* Render fields dynamically based on the step */}
          {currentStep === "step1" && (
            <>
              <label>Name</label>
              <Field name="name" as={Input} />
              <ErrorMessage
                name="name"
                render={(msg) => <ErrorLabel>{msg}</ErrorLabel>}
              />
            </>
          )}
          {currentStep === "step2" && (
            <>
              <label>Email</label>
              <Field name="email" as={Input} />
              <ErrorMessage
                name="email"
                render={(msg) => <ErrorLabel>{msg}</ErrorLabel>}
              />
            </>
          )}
          {currentStep === "step3" && (
            <>
              <label>Age</label>
              <Field name="age" as={Input} />
              <ErrorMessage
                name="age"
                render={(msg) => <ErrorLabel>{msg}</ErrorLabel>}
              />
            </>
          )}
          {currentStep === "step4" && (
            <>
              <label>Address</label>
              <Field name="address" as={Input} />
              <ErrorMessage
                name="address"
                render={(msg) => <ErrorLabel>{msg}</ErrorLabel>}
              />
            </>
          )}
          {/* Buttons */}
          <div style={{ marginTop: 20 }}>
            {!isFirst && (
              <Button
                type="button"
                onClick={() => {
                  // setValues(formikValues);
                  goToStep(stepIndex - 1);
                }}
              >
                Previous
              </Button>
            )}

            {!isLast ? (
              <Button type="submit">Next {loading && <Spinner />}</Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </Form>
      </Formik>
    </FormLayout>
  );
}
