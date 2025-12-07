// app/components/FormLayout.tsx
"use client";

import Link from "next/link";

export default function FormLayout({
  step,
  children,
}: {
  step: number;
  children: React.ReactNode;
}) {
  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <h1>Step {step}</h1>
      {children}
    </div>
  );
}
