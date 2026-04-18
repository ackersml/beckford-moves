import { createReader } from "@keystatic/core/reader";
import { NextResponse } from "next/server";
import config from "../../../../keystatic.config";

const reader = createReader(process.cwd(), config);

export async function GET() {
  const [
    homepage,
    about,
    howItWorks,
    packages,
    successStories,
    fstMassageTherapy,
    blog,
    contact,
  ] = await Promise.all([
    reader.singletons.homepage.read(),
    reader.singletons.about.read(),
    reader.singletons.howItWorks.read(),
    reader.singletons.packages.read(),
    reader.singletons.successStories.read(),
    reader.singletons.fstMassageTherapy.read(),
    reader.singletons.blog.read(),
    reader.singletons.contact.read(),
  ]);
  return NextResponse.json({
    homepage,
    about,
    howItWorks,
    packages,
    successStories,
    fstMassageTherapy,
    blog,
    contact,
  });
}
