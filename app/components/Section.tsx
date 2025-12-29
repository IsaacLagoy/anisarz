interface SectionProps {
  header?: string;
  children?: React.ReactNode;
  dark?: boolean;
  className?: string;
}

export default function Section({
  header,
  children,
  dark = false,
  className = ''
}: SectionProps) {
  return (
    <section className={`w-full h-full ${dark ? 'text-[#333]' : 'text-[white]'}`}>
      <div className={`w-full h-full ${className}`}>
        {header && <h2 className="text-6xl md:text-7xl font-bold mb-8">{header}</h2>}
        {children}
      </div>
    </section>
  );
}
