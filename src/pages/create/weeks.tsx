import type { NextPage } from "next";
import DashboardShell from "../../components/Dashboard";
import WizardWeekAtAGlanceForm from "../../components/program/forms/MultistepProgramForm/WeekAtAGlanceForm";

const CreatePage: NextPage = () => {
  return (
    <DashboardShell>
      {/* <WizardWeeksForm /> */}
      <WizardWeekAtAGlanceForm />
    </DashboardShell>
  );
};

export default CreatePage;
