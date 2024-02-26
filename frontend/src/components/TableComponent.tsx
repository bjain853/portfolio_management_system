import {
  Center,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { convertKeyToHeading } from "../util/stringFunctions";

interface IProps<T extends {}> {
  columns: string[];
  rows: T[];
  heading: string;
  color?: string;
  variant?: string;
}

export default function TableComponent<T extends Object>({
  columns,
  rows,
  color = "teal",
  variant = "striped",
  heading,
}: IProps<T>) {
  return rows ? (
    <Center>
      <Text fontSize="2xl" fontWeight="bold">
        No Data Available
      </Text>
    </Center>
  ) : (
    <TableContainer>
      <Table variant={variant} colorScheme={color}>
        <TableCaption>{heading}</TableCaption>
        <Thead>
          <Tr>
            {columns.map((column: string, idx: number) => (
              <Th key={idx}>{convertKeyToHeading(column)}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row: T) => (
            <Tr>
              {Object.keys(row).map(([key, value]) => (
                <Td key={key}>{value.toString()}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
