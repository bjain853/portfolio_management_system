import { useContext, useEffect, useState } from "react";
import { AdvisorContext } from "../BaseLayout";
import { api } from "../api";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Circle,
  Heading,
  List,
  ListItem,
  Text,
  Image,
  Flex,
} from "@chakra-ui/react";
import { Client } from "../types/client";
import { Advisor } from "../types/advisor";
import { useNavigate } from "react-router-dom";

export default function ClientList() {
  const advisor: Advisor | null = useContext(AdvisorContext);
  const [clientDetails, setClientDetails] = useState<Client[] | undefined>(
    undefined
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientDetails = async () => {
      const response = await api.get(`/advisors/${advisor?.id}/clients`);
      setClientDetails(response.data);
    };

    const fetchPortfolioDetails = async () => {
      // const response = await api.get(`/portfolio/client/${}`)
    };

    fetchClientDetails();
  }, []);

  return (
    <Box m="3em">
      <Center>
        <Heading my="2rem" size="2xl">
          Clients
        </Heading>
      </Center>
      <Center>
        <List spacing={3} width="50%">
          {!clientDetails ? (
            <Center>
              <Heading>No Data Available</Heading>
            </Center>
          ) : (
            clientDetails.map((client) => (
              <ListItem key={client.id} py="2em" px="1em">
                <Card
                  zIndex="3"
                  onClick={() => navigate(`${client.id}`)}
                  cursor="pointer"
                >
                  <CardHeader>
                    <Flex>
                      <Circle pr="0.5em">
                        <Image
                          src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-grey-male-icon.png"
                          alt="Green double couch with wooden legs"
                          height="40px"
                          width="40px"
                        />
                      </Circle>
                      <Heading>
                        {client.firstName} {client.lastName}
                      </Heading>
                    </Flex>
                  </CardHeader>
                  <CardBody></CardBody>
                </Card>
              </ListItem>
            ))
          )}
        </List>
      </Center>
    </Box>
  );
}
