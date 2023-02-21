import type { SelectProps } from "@mantine/core";
import { Select } from "@mantine/core";
import { Controller } from "react-hook-form";

type InputProps = SelectProps & {
  error?: string;
  control: any;
  fieldName: string;
};
export default function HFSelect({
  error,
  control,
  fieldName,
  ...rest
}: InputProps) {
  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field: { onChange, onBlur } }) => (
        <Select
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
