import { Tabs, Title } from "@mantine/core";
import { useState } from "react";
import DashboardShell from "../../../components/Dashboard";
import CreatedProgramList from "../../../components/UserProgram/CreatedProgramList";
import SubscribedProgramList from "../../../components/UserProgram/SubscribedProgramList";
import { api } from "../../../utils/api";

export default function ProgramsHome() {
  const [activeTab, setActiveTab] = useState<string | null>("first");
  const programList = api.program.getAllByAuthor.useQuery();

  return (
    <DashboardShell>
      <Title align="center">Program Collection</Title>
      {!programList.data ? (
        <div>loading</div>
      ) : (
        <div>
          <Tabs value={activeTab} onTabChange={setActiveTab}>
            <Tabs.List>
              <Tabs.Tab value="first">Subscribed</Tabs.Tab>
              <Tabs.Tab value="second">Created</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="first">
              <SubscribedProgramList />
            </Tabs.Panel>
            <Tabs.Panel value="second">
              <CreatedProgramList />
            </Tabs.Panel>
          </Tabs>
        </div>
      )}
    </DashboardShell>
  );
}
