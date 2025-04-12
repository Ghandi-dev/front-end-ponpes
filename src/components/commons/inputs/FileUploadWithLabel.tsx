"use client";

import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ComponentProps } from "react";
import InputFile from "@/components/ui/InputFile";

type Props<S> = {
  fieldTitle: string;
  label?: string;
  nameInSchema: keyof S & string;
  isUploading?: boolean;
  isDeleting?: boolean;
  preview?: string;
  onUpload?: (files: FileList, onChange: (...event: unknown[]) => void) => void;
  onDelete?: (onChange: (...event: unknown[]) => void) => void;
} & Omit<ComponentProps<typeof InputFile>, "onUpload" | "onDelete" | "preview" | "isUploading" | "isDeleting" | "name" | "isInvalid" | "errorMessage">;

export function FileUploadWithLabel<S>({ fieldTitle, nameInSchema, isUploading, isDeleting, preview, onUpload, onDelete, ...props }: Props<S>) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <InputFile
              {...props}
              name={nameInSchema}
              isUploading={isUploading}
              isDeleting={isDeleting}
              label={fieldTitle}
              preview={preview}
              onUpload={(files) => onUpload?.(files, field.onChange)}
              onDelete={() => onDelete?.(field.onChange)}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
