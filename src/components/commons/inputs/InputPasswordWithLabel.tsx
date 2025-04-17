"use client";

import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { InputHTMLAttributes } from "react";

type Props<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function InputPasswordWithLabel<S>({ fieldTitle, nameInSchema, className, ...props }: Props<S>) {
  const form = useFormContext();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisible = () => setIsVisible((prev) => !prev);

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={nameInSchema}>{fieldTitle}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                id={nameInSchema}
                type={isVisible ? "text" : "password"}
                className={`w-full disabled:text-blue-500 dark:disabled:text-green-500 disabled:opacity-75 ${className}`}
                {...props}
                {...field}
              />
              <button type="button" className="absolute top-1/2 right-3 -translate-y-1/2" onClick={toggleVisible}>
                {isVisible ? <Eye /> : <EyeClosed />}
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
