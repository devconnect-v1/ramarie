import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type ListOfErrors = (string | null | undefined)[] | null | undefined;

interface FieldProps {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps: React.InputHTMLAttributes<HTMLInputElement> & {
    "data-cy"?: string;
  };
  errors?: ListOfErrors;
  className?: string;
  errorId?: string;
}

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
}: FieldProps) {
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [inputValue, setInputValue] = useState<string>("");
  const isPasswordInput = inputProps.type === "password";
  const togglePasswordVisibility = () => setVisiblePassword(!visiblePassword);
  return (
    <div>
      <div className={className}>
        <Label
          className="block text-base font-medium text-gray-700"
          htmlFor={inputProps.id}
          {...labelProps}
        />
        <div className="mt-1 relative">
          <Input
            {...inputProps}
            type={isPasswordInput && visiblePassword ? "text" : inputProps.type}
            aria-describedby={errorId}
            aria-invalid={errors ? true : undefined}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {isPasswordInput ? (
            <button
              onClick={() => togglePasswordVisibility()}
              type="button"
              className={"absolute inset-y-0 right-0 pr-3 flex items-center"}
            >
              {visiblePassword ? (
                <FaEyeSlash className="text-gray-400" />
              ) : (
                <FaEye />
              )}
            </button>
          ) : null}
          {errors ? (
            <div id={errorId} className="pt-1 text-red-700">
              <ErrorList errors={errors} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
