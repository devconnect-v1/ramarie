import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type ListOfErrors = (string | null | undefined)[] | null | undefined;

export function ErrorList({
  id,
  errors,
}: {
  errors?: ListOfErrors;
  id?: string;
}) {
  const errorsToRender = errors?.filter(Boolean);
  if (!errorsToRender?.length) return null;
  return (
    <ul id={id} className="flex flex-col gap-1">
      {errorsToRender.map((e) => (
        <li key={e} className="text-[10px] text-foreground-danger">
          {e}
        </li>
      ))}
    </ul>
  );
}

export function Field({
  labelProps,
  inputProps,
  errors,
  className,
  errorId,
}: {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  errors?: ListOfErrors;
  className?: string;
  errorId?: string;
}) {
  return (
    <div className={className}>
      <Label
        className="block text-sm font-medium text-gray-700"
        htmlFor={inputProps.id}
        {...labelProps}
      />
      <div className="mt-1">
        <Input
          {...inputProps}
          aria-describedby={errorId}
          aria-invalid={errors ? true : undefined}
        />
        {errors ? (
          <div id={errorId} className="pt-1 text-red-700">
            {errors}
          </div>
        ) : null}
      </div>
    </div>
  );
}
