// app/api/user/[id]/route.ts
import { IsrcLookupResponse } from "@/app/sharedTypes";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  // --- Add delay ---
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock response
  const user: IsrcLookupResponse = {
    id,
    title: "Yesterday",
    trackNumber: 12341234,
    composers: ["Lorem", "Ipsum"],
    arranger: "Dolor",
    author: "Sit Amet",
  };

  return NextResponse.json(user, { status: 200 });
}
