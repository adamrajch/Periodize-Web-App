import type { NextPage } from "next";
import DashboardShell from "../../components/Dashboard";
import WizardDetailsForm from "../../components/program/forms/MultistepProgramForm/DetailsForm";

const CreatePage: NextPage = () => {
  return (
    <DashboardShell>
      <div>Programs</div>
      <WizardDetailsForm />
    </DashboardShell>
  );
};

export default CreatePage;
