import { cn } from "@/lib/utils";

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
      <span
        className={cn(
          "flex items-center gap-2 uppercase after:content-[''] after:w-24 after:h-[2px] text-sm font-light after:bg-primary text-muted-foreground",
          { "after:bg-background text-background": subtitleVariant },
        )}
      >
        {subtitle}
      </span>
      <h1
        className={cn(
          "text-[60px] font-heading font-light text-secondary-foreground",
          { "text-background": titleVariant },
        )}
      >
        {title}
      </h1>
    </div>
  );
};

export default TitleSection;
