import { Grid } from "@mantine/core";
import type { Program } from "@prisma/client";
import type { GetServerSideProps } from "next";
import SearchProgramsForm from "../../components/program/forms/SearchProgram/SearchProgramsForm";
import ProgramCard from "../../components/program/searchpage/ProgramCard";
import { prisma } from "../../server/db";

export default function SearchPage({ programs }: { programs: Program[] }) {
  return (
    <div>
      <div>Search Page</div>
      <SearchProgramsForm />
      <Grid>
        {programs.map((program) => (
          <Grid.Col key={program.id} span={4}>
            <ProgramCard program={program} />
          </Grid.Col>
        ))}
      </Grid>
      {/* {JSON.stringify(programs, null, 2)} */}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.query.q);
  const programs = await prisma.program.findMany({
    take: 3,
    where: {
      OR: [
        {
          name: {
            contains: context.query.q as string,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      id: "asc",
    },
  });
  console.log(programs);
  return {
    props: {
      programs: JSON.parse(JSON.stringify(programs)),
    },
  };
};
