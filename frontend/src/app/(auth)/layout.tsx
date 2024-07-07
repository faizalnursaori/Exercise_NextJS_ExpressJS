import { ReactNode } from "react";
import RootLayout from "../layout";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <RootLayout isAuthPage={true}>
      <main>
        <div className="min-h-screen flex items-stretch justify-center [&>*]:flex-1 [&>section>*]:w-full">
          {children}
        </div>
      </main>
    </RootLayout>
  );
}
