import { color as colors } from "@/constant/style";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  color?: string;
  label: string;
  background?: string;
  variant?: "success" | "disable" | "error" | "warning";
  outlined?: boolean;
};

function Badge({
  className,
  color,
  background,
  label,
  variant = "success",
  outlined = false,
}: Props) {
  return (
    <span
      style={{
        color: color || colors[variant].text,
        background: outlined
          ? undefined
          : background || colors[variant].background,
        border: outlined
          ? `border 1px solid ${colors[variant].text}`
          : undefined,
      }}
      className={twMerge(
        "px-2 py-2 rounded-lg text-xs tracking-wide",
        className
      )}
    >
      {label}
    </span>
  );
}

export default Badge;
