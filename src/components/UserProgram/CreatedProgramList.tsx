import { api } from "../../utils/api";
import { UserProgramTable } from "./UserProgramTable";

export default function CreatedProgramList() {
  const programList = api.program.getAllByAuthor.useQuery();
  return (
    <div>
      {!programList.data ? (
        <div>loading</div>
      ) : (
        <div>
          <UserProgramTable data={programList.data} />
        </div>
      )}
    </div>
  );
}
