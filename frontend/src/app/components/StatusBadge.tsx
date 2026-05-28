import "../styles/components/StatusBadge.css";

interface StatusBadgeProps {
  status: "Safe" | "Warning" | "Danger" | string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variant =
    status === "Danger"
      ? "danger"
      : status === "Warning"
      ? "warning"
      : "safe";

  return <span className={`status-badge status-badge--${variant}`}>{status}</span>;
}
