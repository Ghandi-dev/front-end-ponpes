export default function PrintLayout({ children }: { children: React.ReactNode }) {
  return <div className="print:bg-white print:w-full print:h-full">{children}</div>;
}
