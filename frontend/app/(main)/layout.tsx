import Navbar from "@/components/Navbar";
import auth from "@/lib/auth";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await auth();

  return (
    <>
      <Navbar user={user} />
      {children}
    </>
  );
}
