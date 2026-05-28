import * as React from "react";
import { Card } from "./ui/card";
import { cn } from "./ui/utils";
import "../styles/components/MobileCard.css";

function MobileCard({ className, ...props }: React.ComponentProps<"div">) {
  return <Card className={cn("mobile-card", className)} {...props} />;
}

export { MobileCard };
