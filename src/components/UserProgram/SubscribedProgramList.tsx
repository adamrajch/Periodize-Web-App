import { Title } from "@mantine/core";
import Link from "next/link";
import { api } from "../../utils/api";

export default function SubscribedProgramList() {
  const programList = api.program.getAllByAuthor.useQuery();
  return (
    <div>
      <Title order={2}>User Programs</Title>
      {!programList.data ? (
        <div>loading</div>
      ) : (
        <div>
          {programList.data.map((program) => (
            <div key={program.id}>
              <Link href={`/dashboard/programs/${program.id}`}>
                {program.name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
