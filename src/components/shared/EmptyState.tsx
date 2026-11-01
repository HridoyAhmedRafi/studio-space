import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "cn";

interface EmptyStateAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  primaryAction?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  className?: string;
}

const actionClass = (variant: "primary" | "secondary", className?: string) =>
  cn(
    "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors",
    variant === "primary"
      ? "bg-[#d1234c] text-white hover:bg-[#b51f43]"
      : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-transparent dark:text-gray-300 dark:hover:bg-gray-800",
    className,
  );

const Action = ({
  action,
  variant,
}: {
  action: EmptyStateAction;
  variant: "primary" | "secondary";
}) => {
  if (action.href) {
    return (
      <Link href={action.href} className={actionClass(variant)}>
        {action.label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={action.onClick}
      className={actionClass(variant)}
    >
      {action.label}
    </button>
  );
};

const EmptyState = ({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-gray-700 dark:bg-[#0F172A]",
        className,
      )}
    >
      <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-[#d1234c]/10 text-[#d1234c] dark:bg-[#d1234c]/15 dark:text-[#f47291]">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>

      {description && (
        <p className="mt-2 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}

      {(primaryAction || secondaryAction) && (
        <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row">
          {primaryAction && <Action action={primaryAction} variant="primary" />}

          {secondaryAction && (
            <Action action={secondaryAction} variant="secondary" />
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
