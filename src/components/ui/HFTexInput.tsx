import type { TextInputProps } from "@mantine/core";
import { TextInput } from "@mantine/core";
import type { FormEvent, RefCallback } from "react";

type InputProps = TextInputProps & {
  error?: string;
  type?: "password" | "text" | "phone-number";
  registerProps?: {
    onChange?: (ev: FormEvent<HTMLInputElement>) => unknown;
    onBlur?: (ev: FormEvent<HTMLInputElement>) => unknown;
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
export default function HFTextInput({
  error,

  registerProps,
  ...rest
}: InputProps) {
  return <TextInput error={error ?? ""} {...(registerProps ?? {})} {...rest} />;
}
