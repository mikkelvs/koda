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
    <div className=" lg:w-1/2 mx-12 lg:mx-auto p-8 bg-white rounded-md shadow-lg mt-10 border-2 border-gray-500">
      <h1 className="mb-4">Koda Cover Registrering</h1>
      {children}
    </div>
  );
}
