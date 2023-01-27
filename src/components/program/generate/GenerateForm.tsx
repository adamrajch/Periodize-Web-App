import Input from "@ui/Input";
import { useState } from "react";

export default function GenerateForm() {
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");

  return (
    <div>
      <Input label="name" />
      <div className="flex h-5 items-center">
        <input
          id="comments"
          aria-describedby="comments-description"
          name="comments"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor="comments" className="font-medium text-gray-700">
          Comments
        </label>
        <p id="comments-description" className="text-gray-500">
          Get notified when someones posts a comment on a posting.
        </p>
      </div>
    </div>
  );
}
