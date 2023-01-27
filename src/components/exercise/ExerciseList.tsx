import { Button, Group, Text } from "@mantine/core";
import { api } from "../../utils/api";

export default function ExerciseList() {
  const { data: exerciseList } = api.exercise.getAll.useQuery();
  const utils = api.useContext();
  const deleteLift = api.exercise.deleteById.useMutation({
    onSuccess() {
      utils.exercise.getAll.invalidate();
    },
  });
  return (
    <div>
      <h1>lifts</h1>
      {exerciseList?.map((lift) => (
        <Group key={lift.id}>
          <Text>{lift.name}</Text>
          <Button
            onClick={() => {
              deleteLift.mutate({
                id: lift.id,
              });
            }}
          >
            Clear
          </Button>
        </Group>
      ))}
    </div>
  );
}
