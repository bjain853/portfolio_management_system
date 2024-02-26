import { Box, Container } from "@chakra-ui/react";

import StatCard from "../components/StatCard";
import TableComponent from "../components/TableComponent";
import { useFetchTotalPortfolioValue } from "../hooks/portfolio";
import {
  ISecurityRecord,
  useFetchTotalSecurityValueByCategory,
} from "../hooks/security";

export default function Dashboard() {
  const totalPortfolioValue: number = useFetchTotalPortfolioValue();
  const totalSecurityByCategory: ISecurityRecord[] =
    useFetchTotalSecurityValueByCategory();
  return (
    <Box display="flex">
      <StatCard
        value={totalPortfolioValue}
        caption={"Portfolio Total Value"}
        helperText={new Date(Date.now()).toDateString()}
      />
      <Container mt="">
        <TableComponent<ISecurityRecord>
          columns={["security_type", "total_value"]}
          rows={totalSecurityByCategory}
          heading={"Total Securities By Category"}
        />
      </Container>
    </Box>
  );
}
