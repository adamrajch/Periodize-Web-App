import { Title } from "@mantine/core";
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
          <Title>{data.name}</Title> <UpdateDetailsModal program={data} />
        </>
      )}
    </DashboardShell>
  );
}
