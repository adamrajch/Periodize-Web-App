import { useRouter } from "next/router";
import type { FormEvent } from "react";
import { useState } from "react";
import HFTextInput from "../../../ui/HFTexInput";

export default function SearchProgramsForm() {
  const router = useRouter();
  const q = router.query as any;
  const [query, setQuery] = useState<string>(q.q ?? "");
  const onSearch = (e: FormEvent) => {
    e.preventDefault();

    const encodedSearchQuery = encodeURI(query);
    router.push(`/programs/search?q=${encodedSearchQuery}`);
  };
  return (
    <form onSubmit={onSearch}>
      <HFTextInput
        label="Search Programs"
        placeholder="nani"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
