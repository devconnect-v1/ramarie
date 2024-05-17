import { cn } from "@/lib/utils";

const getSubTitleVariantStyle = (subtitleVariant?: string) => {
  switch (subtitleVariant) {
    case "light":
      return "flex items-center gap-2 uppercase after:content-[''] after:w-24 after:h-[2px] text-sm font-light after:bg-background text-background";
    default:
      return "flex items-center gap-2 uppercase after:content-[''] after:w-24 after:h-[2px] text-sm font-light after:bg-primary text-muted-foreground";
  }
};

const getTitleVariantStyle = (titleVariant?: string) => {
  switch (titleVariant) {
    case "light":
      return "text-[60px] font-heading font-light text-background";
    default:
      return "text-[60px] font-heading font-light text-secondary-foreground";
  }
};

interface TitleSectionProps {
  subtitle: string;
  title: string;
  titleVariant?: string;
  subtitleVariant?: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({
  subtitle,
  title,
  titleVariant,
  subtitleVariant,
}) => {
  return (
    <div className="flex flex-col gap-0">
      <span className={cn(getSubTitleVariantStyle(subtitleVariant))}>
        {subtitle}
      </span>
      <h1 className={cn(getTitleVariantStyle(titleVariant))}>
        {title}
      </h1>
    </div>
  );
};

export default TitleSection;
