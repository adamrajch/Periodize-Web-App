import type { ComponentProps } from "react";

interface CheckboxProps extends ComponentProps<"input"> {
  name: string;
  label: string;
  desc?: string;
  setValue?: () => void;
}
export default function HFCheckbox({
  label,
  desc,
  name,
  value,
  ...rest
}: CheckboxProps) {
  return (
    <div className="relative flex items-start">
      <div className="flex h-5 items-center">
        <input
          id="name"
          aria-describedby={`${name}-description`}
          name="name"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          value={value}
          {...rest}
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor="comments" className="font-medium ">
          {label}
        </label>
        {desc && (
          <p id="comments-description" className="  ">
            {desc}
          </p>
        )}
      </div>
    </div>
  );
}
