import { Box, Card, CardBody, Container } from "@chakra-ui/react";

import StatCard from "../components/StatCard";
import TableComponent from "../components/TableComponent";

import { ISecurityRecord } from "../types/security";
import { useState, useEffect } from "react";
import { api } from "../url";
export default function Dashboard() {
  const [totalPortfolioValue, setTotalPortfolioValue] = useState<number>(0.0);
  const [totalSecurityValueByCategory, setTotalSecurityValueByCategory] =
    useState<ISecurityRecord[]>([]);
  useEffect(() => {
    api.get(`security/total-category`).then((response) => {
      const dataArray: ISecurityRecord[] = [];
      for (const [key, value] of Object.entries(response.data)) {
        dataArray.push({
          security_type: key,
          total_value: parseFloat(`${value}`),
        });
      }
      setTotalSecurityValueByCategory(dataArray);
    });

    api
      .get("security/total")
      .then((response) => setTotalPortfolioValue(response.data));
  }, []);

  return (
    <Box display="flex">
      <StatCard
        value={totalPortfolioValue}
        caption={"Portfolio Total Value"}
        date={new Date(Date.now()).toDateString()}
        navLink="/clients"
      />
      <Container mt="">
        <Card>
          <CardBody>
            <TableComponent<ISecurityRecord>
              columns={["security_type", "total_value"]}
              rows={totalSecurityValueByCategory}
              heading={"Total Securities By Category"}
              variant="simple"
            />
          </CardBody>
        </Card>
      </Container>
    </Box>
  );
}
