import { IsrcLookupResponse } from "@/app/sharedTypes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await new Promise((resolve) => setTimeout(resolve, 1000));

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
