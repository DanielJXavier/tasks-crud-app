export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="inline-grid justify-self-center min-w-80 md:min-w-100 px-8 py-12 gap-y-6 border border-transparent rounded-3xl shadow-xl bg-[#fdfcfc]">
      {children}
    </div>
  );
}
