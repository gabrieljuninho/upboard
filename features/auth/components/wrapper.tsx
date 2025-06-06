import { FC, ReactNode } from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Social from "@/features/auth/components/social";

interface IWrapperProps {
  title: string;
  description?: string;
  type: "sign up" | "login";
  children: ReactNode;
}

const FormWrapper: FC<IWrapperProps> = ({
  title,
  description,
  type,
  children,
}) => {
  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {children}
          <div className="flex flex-col gap-5">
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-card text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>
            <Social />
          </div>
          {type === "login" ? (
            <>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href={"/signup"} className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href={"/login"} className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <Link href={"#"}>Terms of Service</Link> and{" "}
        <Link href={"#"}>Privacy Policy</Link>.
      </div>
    </div>
  );
};

export default FormWrapper;
