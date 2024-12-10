import { prisma } from "@/lib/prisma";
import { PageContent } from "@/ui/layout/page-content";
import { notFound, redirect } from "next/navigation";
import { use } from "react";
import { ProgramsPageClient } from "./page-client";

export default async function Programs({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const program = await prisma.program.findFirst({
    where: {
      workspace: {
        slug,
      },
    },
  });
  if (!program) {
    notFound();
  }

  redirect(`/${slug}/programs/${program.id}`);

  return (
    <PageContent>
      <ProgramsPageClient />
    </PageContent>
  );
}
