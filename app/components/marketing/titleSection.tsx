interface TitleSectionProps {
  subtitle: string;
  title: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({ subtitle, title }) => {
  return (
    <div className="flex flex-col gap-0">
      <span className="flex items-center gap-2 uppercase after:content-[''] after:w-24 after:h-[2px] after:bg-primary text-sm font-light text-muted-foreground">
        {subtitle}
      </span>
      <h1 className="text-[60px] text-secondary-foreground font-heading font-light">
        {title}
      </h1>
    </div>
  );
};

export default TitleSection;
