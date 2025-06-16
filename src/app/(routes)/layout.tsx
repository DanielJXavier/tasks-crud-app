export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid gap-y-6 min-w-80 md:min-w-100 px-8 py-12 rounded-3xl shadow-xl bg-[#fdfcfc]">
      {children}
    </div>
  );
}
