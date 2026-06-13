export default function SectionHeader({ number, title }) {
  return (
    <div className="mb-4 mt-8 md:mt-16 flex items-center text-[#888888] tracking-[0.2em] text-sm md:text-base font-semibold uppercase">
      <span>{number}</span>
      <span className="mx-3">—</span>
      <span>{title}</span>
    </div>
  );
}
