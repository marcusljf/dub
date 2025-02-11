"use client";

import useIntegrations from "@/lib/swr/use-integrations";
import useWorkspace from "@/lib/swr/use-workspace";
import { InstalledIntegrationProps } from "@/lib/types";
import { DubCraftedShield, Tooltip } from "@dub/ui";
import { DUB_WORKSPACE_ID } from "@dub/utils";
import { cn } from "@dub/utils/src";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { HTMLProps, PropsWithChildren } from "react";
import { IntegrationLogo } from "./integration-logo";

export default function IntegrationCard(
  integration: InstalledIntegrationProps,
) {
  const { integrations: activeIntegrations } = useIntegrations();

  const installed = activeIntegrations?.some((i) => i.id === integration.id);

  const dubCrafted = integration.projectId === DUB_WORKSPACE_ID;

  return (
    <Wrapper integration={integration}>
      {installed ? (
        <Badge className="bg-green-100 text-green-800">Enabled</Badge>
      ) : integration.comingSoon ? (-neutral-
        <Badge className="bg-violet-100 text-violet-800">Coming Soon</Badge>
      ) : integration.guideUrl ? (
        <Badge className="bg-blue-100 text-blue-800">-neutral-
          <span>Guide</span>
          <div className="flex w-0 justify-end overflow-hidden opacity-0 transition-[width,opacity] group-hover:w-3 group-hover:opacity-100">
            <ArrowUpRight className="size-2.5" strokeWidth={2.5} />
          </div>
        </Badge>-neutral--neutral-
      ) : undefined}
      <IntegrationLogo src={integration.logo ?? null} alt={integration.name} />
      <h3 className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-gray-800">
        {integration.name}
        {dubCrafted && (
          <Tooltip content="Dub Crafted">
            {/* TODO: Add "Learn more" link ^ */}
            <div>
              <DubCraftedShield className="size-4 -translate-y-px" />
            </div>
          </Tooltip>
        )}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm text-neutral-600">
        {integration.description}-neutral-
      </p>
    </Wrapper>
  );
}

function Wrapper({
  integration,
  children,
}: PropsWithChildren<{
  integration: InstalledIntegrationProps;
}>) {
  const { slug } = useWorkspace();-neutral-

  const className = cn(
    "group relative rounded-lg border border-gray-200 bg-white p-4 transition-[filter]",
    integration.comingSoon ? "cursor-default" : "hover:drop-shadow-card-hover",
  );-neutral-

  return integration.comingSoon ? (
    <div className={className}>{children}</div>
  ) : (
    <Link
      href={
        integration.guideUrl ||-neutral-
        `/${slug}/settings/integrations/${integration.slug}`
      }
      target={integration.guideUrl ? "_blank" : undefined}-neutral-
      className={className}
    >
      {children}
    </Link>
  );
}

function Badge({ className, ...rest }: HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "absolute right-4 top-4 flex items-center rounded px-2 py-1 text-[0.625rem] font-semibold uppercase leading-none",
        className,
      )}
      {...rest}
    />
  );
}
