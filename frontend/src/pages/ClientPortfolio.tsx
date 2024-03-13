import { useLoaderData } from "react-router-dom";
import { Portfolio as IPortfolio } from "../types/portfolio";
import { useState, useEffect } from "react";
import { api } from "../api";
import { Box } from "@chakra-ui/react";
import SecuritiesTable from "../components/SecuritiesTable";
import AddSecurityForm from "../components/AddSecurityForm";

function ClientPortfolio() {
  const clientId = useLoaderData() as string;
  const [portfolio, setPotfolio] = useState<IPortfolio | undefined>(undefined);
  useEffect(() => {
    const fetchPortfolio = async () => {
      const response = await api.get(`/portfolio/client/${clientId}`);
      setPotfolio(response.data);
    };
    fetchPortfolio();
  }, []);
  console.log(portfolio);
  return (
    <Box>
      <SecuritiesTable securities={portfolio?.securities} />
      <AddSecurityForm portfolioId={portfolio?.id} />
    </Box>
  );
}

export default ClientPortfolio;
