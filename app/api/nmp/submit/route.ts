import { NextRequest, NextResponse } from "next/server";

type FormValues = {
  name: string;
  email: string;
  age: number;
  address: string;
};

export async function POST(req: NextRequest) {
  try {
    const body: FormValues = await req.json();

    // Here you can handle the form values, e.g., save to DB or call another API
    console.log("Received form values:", body);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({
      message: "Form submitted successfully",
      data: body,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Invalid request payload" },
      { status: 400 }
    );
  }
}
