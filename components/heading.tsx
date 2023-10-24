import { LucideIcon } from "lucide-react";
interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}

const Heading = ({
  title,
  description,
  icon,
  iconColor,
  bgColor,
}: HeadingProps) => {
  return <div>Heading</div>;
};

export default Heading;
