"use client";

import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import DatePicker from "../ui/date-picker"; // Pastikan path benar
import { ComponentProps } from "react";

type Props<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  className?: string;
} & Omit<ComponentProps<typeof DatePicker>, "onSelect" | "selected">;

export function InputDateWithLabel<S>({ fieldTitle, nameInSchema, ...props }: Props<S>) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={nameInSchema}>{fieldTitle}</FormLabel>
          <FormControl>
            <DatePicker selected={field.value} onSelect={(date) => field.onChange(date ?? undefined)} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
