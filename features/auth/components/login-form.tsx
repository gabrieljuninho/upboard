"use client";

import { useTransition } from "react";
import { useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CircleAlert,
  LoaderCircle,
  Lock,
  Mail,
  TriangleAlert,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import FormWrapper from "@/features/auth/components/wrapper";

import { loginSchema } from "@/schemas/auth";

import { login } from "@/features/auth/actions/login";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();

  const urlParams = useSearchParams();

  const callBackUrl = urlParams.get("callbackUrl");
  const errorUrlParam =
    urlParams.get("error") === "OAuthAccountNotLinked"
      ? "This account is already linked to a user. Please sign in with a different account."
      : "";

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    startTransition(() => {
      login(values, callBackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();

            toast.error(data.error);
          }
        })
        .catch(() => {
          toast.error("Something went wrong.");
        });
    });
  };

  return (
    <FormWrapper
      title={"Login to your workspace"}
      description={
        "Access your tasks, projects, and team collaboration by logging into your Upboard workspace."
      }
      type={"login"}
    >
      {errorUrlParam && (
        <Alert variant={"destructive"}>
          <CircleAlert />
          <AlertDescription>{errorUrlParam}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="data-[error=true]:text-foreground font-normal">
                  Email Address
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute top-1/2 left-3 -translate-y-1/2">
                      <Mail
                        className={cn(
                          "size-4",
                          form.formState.errors.email
                            ? "text-destructive"
                            : "text-muted-foreground"
                        )}
                      />
                    </div>
                    <Input
                      {...field}
                      type="email"
                      placeholder="upboard@example.com"
                      autoComplete="off"
                      className={cn(
                        "pl-9 text-sm",
                        form.formState.errors.email
                          ? "ring-destructive/20 border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive"
                          : ""
                      )}
                      disabled={isPending}
                    />
                  </div>
                </FormControl>
                <div className="flex items-center gap-1">
                  {form.formState.errors.email && (
                    <TriangleAlert className="text-destructive size-3" />
                  )}
                  <FormMessage className="text-xs" />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="data-[error=true]:text-foreground font-normal">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute top-1/2 left-3 -translate-y-1/2">
                      <Lock
                        className={cn(
                          "size-4",
                          form.formState.errors.password
                            ? "text-destructive"
                            : "text-muted-foreground"
                        )}
                      />
                    </div>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Minimum 8 characters"
                      autoComplete="off"
                      className={cn(
                        "pl-9 text-sm",
                        form.formState.errors.password
                          ? "ring-destructive/20 border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive"
                          : ""
                      )}
                      disabled={isPending}
                    />
                  </div>
                </FormControl>
                <div className="flex items-center gap-1">
                  {form.formState.errors.password && (
                    <TriangleAlert className="text-destructive size-3" />
                  )}
                  <FormMessage className="text-xs" />
                </div>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <LoaderCircle className="animate-spin" />
                <span>Please wait</span>
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default LoginForm;
