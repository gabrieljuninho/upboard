"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

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

import { signUpSchema } from "@/schemas/auth";
import { LoaderCircle, Lock, Mail, TriangleAlert, User } from "lucide-react";

const SignUpForm = () => {
  const [isPending, setIsPending] = useState<boolean>(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    setIsPending(true);
    console.log(values);
    setIsPending(false);
  };

  return (
    <FormWrapper
      title={"Create your account"}
      description={
        "Sign up to get started with organizing your tasks and collaborating with your team."
      }
      type={"sign up"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="data-[error=true]:text-foreground font-normal">
                  Full Name
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute top-1/2 left-3 -translate-y-1/2">
                      <User
                        className={cn(
                          "size-4",
                          form.formState.errors.name
                            ? "text-destructive"
                            : "text-muted-foreground"
                        )}
                      />
                    </div>
                    <Input
                      {...field}
                      type="text"
                      maxLength={76}
                      placeholder="John Doe"
                      autoComplete="off"
                      className={cn(
                        "pl-9 text-sm",
                        form.formState.errors.name
                          ? "ring-destructive/20 border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive"
                          : ""
                      )}
                      disabled={isPending}
                    />
                  </div>
                </FormControl>
                <div className="flex items-center gap-1">
                  {form.formState.errors.name && (
                    <TriangleAlert className="text-destructive size-3" />
                  )}
                  <FormMessage className="text-xs" />
                </div>
              </FormItem>
            )}
          />
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
              "Create an account"
            )}
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default SignUpForm;
