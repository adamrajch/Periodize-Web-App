import type { TextInputProps } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { Controller } from "react-hook-form";

type InputProps<U> = TextInputProps & {
  error?: string;
  control: any;
  fieldName: string;
};

export default function HFText<T>({
  error,
  fieldName,
  control,
  ...rest
}: InputProps<T>) {
  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field: { onChange, onBlur } }) => (
        <TextInput
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          {...rest}
        />
      )}
    />
  );
}
