import { useDebouncedState } from "@mantine/hooks";
import { api } from "../../utils/api";
import HFTextInput from "../ui/HFTexInput";

export default function SearchLifts() {
  const [query, setQuery] = useDebouncedState("", 100);

  const { data } = api.exercise.searchUserAndPublicExercises.useQuery(
    {
      query: query,
    },
    {
      enabled: query.length > 2,
    }
  );

  return (
    <div>
      SearchLifts
      <HFTextInput
        label="Search Lifts"
        placeholder="Squat"
        defaultValue={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
      />
      <div>
        {data?.map((lift) => (
          <div key={lift.id}>{lift.name}</div>
        ))}
      </div>
    </div>
  );
}
