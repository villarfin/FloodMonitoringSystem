// @ts-expect-error JS app entry is imported from the legacy mobile scaffold.
import LegacyApp from "../App";

export default function Index() {
  return <LegacyApp />;
}
