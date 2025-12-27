interface SectionProps {
  header?: string;
  children?: React.ReactNode;
  dark?: boolean;
}

export default function Section({
  header,
  children,
  dark = false
}: SectionProps) {
  return (
    <section className={`w-full h-full ${dark ? 'text-[#333]' : ''}`}>
      <div className="w-full h-full p-[10%]">
        {header && <h2 className="text-6xl md:text-7xl font-bold mb-8">{header}</h2>}
        {children}
      </div>
    </section>
  );
}
