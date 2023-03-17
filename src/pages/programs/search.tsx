import { Grid, Stack, Title } from "@mantine/core";
import type { Program } from "@prisma/client";
import type { GetServerSideProps } from "next";
import SearchProgramsForm from "../../components/program/forms/SearchProgram/SearchProgramsForm";
import ProgramCard from "../../components/program/searchpage/ProgramCard";
import { prisma } from "../../server/db";

export default function SearchPage({ programs }: { programs: Program[] }) {
  return (
    <Stack p="md">
      <Title order={1}>Search Page</Title>
      <SearchProgramsForm />
      {programs.length ? (
        <Grid>
          {programs.map((program) => (
            <Grid.Col key={program.id} span={4}>
              <ProgramCard program={program} />
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <div>No results! Sorry bruh</div>
      )}
    </Stack>
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
    include: {
      author: true,
    },
  });
  console.log(programs);
  return {
    props: {
      programs: JSON.parse(JSON.stringify(programs)),
    },
  };
};
