import { NextResponse } from "next/server";
import { paymasterStatus } from "@/lib/aa/paymaster";

export async function GET() {
  return NextResponse.json(paymasterStatus());
}
