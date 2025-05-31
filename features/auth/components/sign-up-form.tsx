"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Lock, Mail, TriangleAlert, User } from "lucide-react";

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
      title={"Start organizing your work"}
      description={"Create your account and bring structure to your workflow"}
      type={"sign up"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute top-1/2 left-2.5 -translate-y-1/2">
                      <User className="text-muted-foreground size-4" />
                    </div>
                    <Input
                      {...field}
                      type="text"
                      placeholder="John Doe"
                      maxLength={76}
                      autoComplete="off"
                      className="h-10 pl-9 text-sm shadow-none"
                      disabled={isPending}
                    />
                  </div>
                </FormControl>
                <div className="flex items-center gap-1">
                  {fieldState.error && (
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
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Work Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute top-1/2 left-2.5 -translate-y-1/2">
                      <Mail className="text-muted-foreground size-4" />
                    </div>
                    <Input
                      {...field}
                      type="email"
                      placeholder="upboard@example.com"
                      autoComplete="off"
                      className="h-10 pl-9 text-sm shadow-none"
                      disabled={isPending}
                    />
                  </div>
                </FormControl>
                <div className="flex items-center gap-1">
                  {fieldState.error && (
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
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute top-1/2 left-2.5 -translate-y-1/2">
                      <Lock className="text-muted-foreground size-4" />
                    </div>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Minimum 8 characters"
                      maxLength={256}
                      autoComplete="off"
                      className="h-10 pl-9 text-sm shadow-none"
                      disabled={isPending}
                    />
                  </div>
                </FormControl>
                <div className="flex items-center gap-1">
                  {fieldState.error && (
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
            {isPending ? "Loading..." : "Create an account"}
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default SignUpForm;
