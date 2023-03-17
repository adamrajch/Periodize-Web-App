import { ActionIcon, Group, Menu, Stack, Title } from "@mantine/core";

import {
  IconDeviceFloppy,
  IconEdit,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import DashboardShell from "../../../components/Dashboard";
import EditProgramForm from "../../../components/UserProgram/EditProgramForm";
import UpdateDetailsModal from "../../../components/UserProgram/UpdateDetailsModal";
import { api } from "../../../utils/api";

export default function UserProgramById() {
  const router = useRouter();
  const str = router.query.id as string;
  const { data } = api.program.getById.useQuery(str);
  const utils = api.useContext();

  const deleteProgramMutation = api.program.delete.useMutation({
    onSettled() {
      utils.program.getById.invalidate(data?.id);
    },
  });

  async function deleteProgram() {
    if (data?.id) {
      deleteProgramMutation.mutate(data.id);
      router.push(`/dashboard/programs`);
    }
  }
  return (
    <DashboardShell>
      {!data ? (
        <div>loading</div>
      ) : (
        <Stack>
          <Group position="apart">
            <Title>{data.name}</Title>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon>
                  <IconSettings />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  icon={<IconEdit size={14} />}
                  component="button"
                ></Menu.Item>
                <Menu.Item icon={<IconDeviceFloppy size={14} />}>
                  Save as Template
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  color="red"
                  icon={<IconTrash size={14} />}
                  onClick={() => deleteProgram()}
                >
                  Delete Program
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <UpdateDetailsModal program={data} />
          </Group>
          <div>Updated: {data.updatedAt.toDateString()}</div>
          <EditProgramForm id={data.id} template={data.template} />
        </Stack>
      )}
    </DashboardShell>
  );
}
