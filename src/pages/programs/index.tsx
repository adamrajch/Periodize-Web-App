import HFTextInput from "../../components/ui/HFTexInput";
import { api } from "../../utils/api";

export default function ProgramsHome() {
  const { data } = api.program.searchPrograms.useQuery({});
  return (
    <div>
      <HFTextInput label="Search Programs" placeholder="Bodybuilding" />
    </div>
  );
}
