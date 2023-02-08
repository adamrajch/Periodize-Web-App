import { useDebouncedState } from "@mantine/hooks";
import { api } from "../utils/api";

export default function useSearchExercises() {
  const [query, setQuery] = useDebouncedState("", 50);

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
    recordList: data,
    setQuery,
    resetQuery,
  };
}
