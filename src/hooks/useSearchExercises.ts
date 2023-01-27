import { useDebouncedState } from "@mantine/hooks";
import { api } from "../utils/api";

export default function useSearchExercises() {
  const [query, setQuery] = useDebouncedState("", 100);

  const { data } = api.exercise.searchUserAndPublicExercises.useQuery(
    {
      query: query,
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
    exercises: data,
    setQuery,
    resetQuery,
  };
}
