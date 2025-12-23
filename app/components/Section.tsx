interface SectionProps {
  header: string;
  children?: React.ReactNode;
}

export default function Section({ header, children }: SectionProps) {
  return (
    <section className="flex flex-col items-center justify-center py-32 px-16">
      <h2 className="text-6xl md:text-7xl font-bold text-white mb-8">{header}</h2>
      {children}
    </section>
  );
}

