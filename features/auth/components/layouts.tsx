import { FC, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

interface IAuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<IAuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <Link
          href={"/"}
          className="flex items-center gap-2 self-center font-medium"
        >
          <Image
            src={"/logo.svg"}
            alt={"Logo"}
            width={30}
            height={30}
            unoptimized
          />
          <span className="text-xl">UpBoard</span>
        </Link>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
