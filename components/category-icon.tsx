import {
  Instagram,
  MessagesSquare,
  Sparkles,
  PenLine,
  ChartNoAxesCombined,
  Store,
  Clock3,
} from "lucide-react";
const icons = {
  instagram: Instagram,
  messages: MessagesSquare,
  sparkles: Sparkles,
  pen: PenLine,
  chart: ChartNoAxesCombined,
  store: Store,
  clock: Clock3,
};
export function CategoryIcon({
  name,
  size = 24,
}: {
  name: string;
  size?: number;
}) {
  const Icon = icons[name as keyof typeof icons] || Sparkles;
  return <Icon size={size} strokeWidth={1.5} aria-hidden="true" />;
}
