// app/api/user/[id]/route.ts
import { NextResponse } from "next/server";

export type UserResponse = {
  id: string;
  name: string;
};

export async function GET(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  // --- Add delay ---
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock response
  const user: UserResponse = {
    id,
    name: `User ${id}`,
  };

  return NextResponse.json(user, { status: 200 });
}
