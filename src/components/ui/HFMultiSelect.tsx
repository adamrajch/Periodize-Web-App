import type { MultiSelectProps } from "@mantine/core";
import { MultiSelect } from "@mantine/core";
import type { RefCallback } from "react";

type InputProps = MultiSelectProps & {
  error?: string;
  type?: "password" | "text" | "phone-number";
  registerProps?: {
    onChange?: (ev: unknown) => unknown;
    onBlur?: (ev: unknown) => unknown;
    ref?: RefCallback<HTMLInputElement>;
    name?: string;
    min?: string | number;
    max?: string | number;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    required?: boolean;
    disabled?: boolean;
  };
};
export default function HFMultiSelect({
  error,
  registerProps,
  ...rest
}: InputProps) {
  return <MultiSelect error={error} {...(registerProps ?? {})} {...rest} />;
}
