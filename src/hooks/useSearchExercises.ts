import { useDebouncedState } from "@mantine/hooks";
import { api } from "../utils/api";

export default function useSearchExercises() {
  const [query, setQuery] = useDebouncedState("", 50);

  const { data } = api.exercise.searchUserAndPublicExercises.useQuery(
    {
      query: query.trim(),
    },
    {
      enabled: query.length > 2,
    }
  );

  function resetQuery() {
    setQuery("");
  }

  return {
    query,
    exerciseList: data ?? [],
    setQuery,
    resetQuery,
  };
}
