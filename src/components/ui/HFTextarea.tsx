import type { TextareaProps } from "@mantine/core";
import { Textarea } from "@mantine/core";
import type { FormEvent, RefCallback } from "react";

type InputProps = TextareaProps & {
  error?: string;
  type?: "password" | "text" | "phone-number";
  registerProps?: {
    onChange?: (ev: FormEvent<HTMLTextAreaElement>) => unknown;
    onBlur?: (ev: FormEvent<HTMLTextAreaElement>) => unknown;
    ref?: RefCallback<HTMLTextAreaElement>;
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
  return <Textarea error={error} {...(registerProps ?? {})} {...rest} />;
}
