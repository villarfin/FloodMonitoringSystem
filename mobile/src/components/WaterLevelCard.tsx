import { ReactNode } from "react";
import { Image, Text, View } from "react-native";
import { MonitoredWater } from "../types";
import { MobileCard } from "./MobileCard";
import { StatusBadge } from "./StatusBadge";
import { colors } from "../styles/theme";
import { styles } from "../styles/components/WaterLevelCard.styles";

type WaterLevelCardProps = Pick<
  MonitoredWater,
  "locationName" | "currentLevel" | "maxLevel" | "status" | "imageSource"
> & {
  expandedContent?: ReactNode;
};

export function WaterLevelCard({
  locationName,
  currentLevel,
  maxLevel,
  status,
  imageSource,
  expandedContent,
}: WaterLevelCardProps) {
  const percentage = Math.max(0, Math.min((currentLevel / maxLevel) * 100, 100));
  const fillColor =
    status === "Danger" ? colors.danger : status === "Warning" ? colors.warning : colors.safe;

  return (
    <MobileCard>
      <Image source={imageSource} style={styles.cover} />
      <View style={styles.header}>
        <Text style={styles.title}>{locationName}</Text>
        <StatusBadge status={status} />
      </View>
      <Text style={styles.levelText}>{currentLevel}m</Text>
      <Text style={styles.maxText}>Max Level: {maxLevel}m</Text>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${percentage}%`, backgroundColor: fillColor }]} />
      </View>
      <Text style={styles.percentText}>{percentage.toFixed(0)}% of max capacity</Text>
      {expandedContent ? <View style={styles.expandedWrap}>{expandedContent}</View> : null}
    </MobileCard>
  );
}
