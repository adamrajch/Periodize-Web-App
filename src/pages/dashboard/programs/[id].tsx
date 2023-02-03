import { Group, Title } from "@mantine/core";
import { useRouter } from "next/router";
import DashboardShell from "../../../components/Dashboard";
import UpdateDetailsModal from "../../../components/UserProgram/UpdateDetailsModal";
import { api } from "../../../utils/api";

export default function UserProgramById() {
  const { query } = useRouter();
  const str = query.id as string;
  const { data } = api.program.getById.useQuery(str);

  return (
    <DashboardShell>
      {!data ? (
        <div>loading</div>
      ) : (
        <>
          <Group position="apart">
            <Title>{data.name}</Title> <UpdateDetailsModal program={data} />
          </Group>
          <div>Updated: {data.updatedAt.toDateString()}</div>
          <EditProgramForm program={data.template as WizardWeeksSchemaType} />
        </>
      )}
    </DashboardShell>
  );
}
