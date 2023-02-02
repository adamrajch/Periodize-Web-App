import type { NumberInputProps } from "@mantine/core";
import { NumberInput } from "@mantine/core";
import type { FormEvent, RefCallback } from "react";

type InputProps = NumberInputProps & {
  error?: string;
  registerProps?: {
    // onChange?: (ev: FormEvent<HTMLInputElement>) => unknown;
    onBlur?: (ev: FormEvent<HTMLInputElement>) => unknown;
    ref?: RefCallback<HTMLInputElement>;
    name?: string;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    required?: boolean;
    disabled?: boolean;
  };
};
export default function NumberInput22({
  error,
  registerProps,
  ...rest
}: InputProps) {
  return <NumberInput error={error} {...(registerProps ?? {})} {...rest} />;
}
