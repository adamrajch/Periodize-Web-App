import type { NumberInputProps } from "@mantine/core";
import { NumberInput } from "@mantine/core";
import { Controller } from "react-hook-form";

type InputProps<U> = NumberInputProps & {
  error?: string;
  control: any;
  fieldName: string;
};

export default function HFNumberInput<T>({
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
        <NumberInput
          placeholder="bruh"
          label="Number of Weeks"
          withAsterisk
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          max={24}
          min={0}
          step={1}
          {...rest}
        />
      )}
    />
  );
}
