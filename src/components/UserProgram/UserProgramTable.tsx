import {
  createStyles,
  ScrollArea,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import type { Program } from "@prisma/client";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  th: {
    padding: "0 !important",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

interface TableProps {
  data: Program[];
}

export function UserProgramTable({ data }: TableProps) {
  const [search, setSearch] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
  };

  const rows = data.map((program) => (
    <tr key={program.id}>
      <td>
        <Link href={`/dashboard/programs/${program.id}`} target="_blank">
          {" "}
          {program.name}
        </Link>
      </td>
      <td>{program.numWeeks}</td>
      <td>{program.updatedAt.toDateString()}</td>
    </tr>
  ));

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: "fixed", minWidth: 700 }}
        highlightOnHover
        withColumnBorders
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Weeks</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td>
                <Text weight={500} align="center">
                  No programs
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
