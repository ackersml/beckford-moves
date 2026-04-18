import { createReader } from "@keystatic/core/reader";
import { NextResponse } from "next/server";
import config from "../../../../keystatic.config";

const reader = createReader(process.cwd(), config);

export async function GET() {
  const homepage = await reader.singletons.homepage.read();
  const about = await reader.singletons.about.read();
  return NextResponse.json({ homepage, about });
}
