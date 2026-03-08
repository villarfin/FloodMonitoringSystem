import { Card, CardContent } from "./ui/card";
import { ReactNode } from "react";

// Props that this component receives
interface StatsCardProps {
  label: string;
  value: string; 
  icon: ReactNode;
}

export function StatsCard({ label, value, icon }: StatsCardProps) {
  return (
    <Card className="w-full h-24">
      <CardContent className="h-full flex flex-col justify-center px-4">
        <div className="flex flex-col justify-right">
          {/* Left side - text */}
          <div>
            <p className="text-sm text-gray-500 text-left leading-none">{label}</p>
            <p className="text-2xl font-semibold leading-none mt-2">{value}</p>
          </div>

          {/* Right side - emoji or image icon */}
          <div className="flex items-center justify-end text-2xl">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}


