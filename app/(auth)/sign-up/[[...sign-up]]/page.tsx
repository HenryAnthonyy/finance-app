import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { LoaderPinwheelIcon } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-[#2E2A47]">Welcome back!</h1>
          <p>Log in or Create a new account to get back to your dashboard</p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignUp />
          </ClerkLoaded>
          <ClerkLoading>
            <LoaderPinwheelIcon className="animate-spin text-muted-foreground h-10 w-10" />
          </ClerkLoading>
        </div>
      </div>

      {/* second column */}
      <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
        <Image src="/logo.svg" height={100} width={100} alt="logo" />
      </div>
    </div>
  );
}
