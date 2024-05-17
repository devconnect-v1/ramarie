interface TitleSectionProps {
  subtitle: string;
  title: string;
  subtitleColor?: string;
  titleColor?: string;
  lineColor?: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({
  subtitle,
  title,
  subtitleColor,
  titleColor,
  lineColor,
}) => {
  return (
    <div className="flex flex-col gap-0">
      <span className={`flex items-center gap-2 uppercase after:content-[''] after:w-24 after:h-[2px] ${lineColor ? lineColor : "after:bg-primary"} text-sm font-light ${subtitleColor ? subtitleColor : "text-muted-foreground"}`}>
        {subtitle}
      </span>
      <h1 className={`text-[60px] ${titleColor ? titleColor : "text-secondary-foreground"} font-heading font-light`}>
        {title}
      </h1>
    </div>
  );
};

export default TitleSection;
