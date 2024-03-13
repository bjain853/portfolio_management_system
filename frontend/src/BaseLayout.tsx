import { createContext, useEffect, useState } from "react";

import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import { api } from "./url";
import { useNavigate } from "react-router-dom";
import { Advisor } from "./types/advisor";

export const AdvisorContext = createContext<Advisor | null>(null);

const BaseLayout = ({ children }: any) => {
  const [advisorProfile, setAdvisorProfile] = useState<Advisor | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchAdvisorProfile() {
      setIsLoading(true);
      try {
        const advisorId = localStorage.getItem("advisorId");
        const response = await api.get(`/advisors/${advisorId}`);
        setAdvisorProfile(response.data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }
    fetchAdvisorProfile();
  }, []);

  const navigate = useNavigate();
  return (
    <AdvisorContext.Provider value={advisorProfile}>
      <Box minWidth="100vw" minHeight="100vh" overflow="hidden">
        <Flex
          flexDirection="row"
          align="center"
          justify="space-around"
          mb="2em"
          mt={{ base: "0", lg: "3em" }}
        >
          <Box
            bg="teal.600"
            color="white"
            width={{ base: "100%", lg: "50%" }}
            ml={{ base: "0", lg: "1em" }}
          >
            <Center>
              <Heading
                my="1em"
                size="2xl"
                onClick={() => navigate("/")}
                cursor="pointer"
              >
                Wells Fargo Portfolio Management
              </Heading>
            </Center>
          </Box>
          <Box>
            <NavBar />
          </Box>
        </Flex>
        {isLoading ? <Heading>Loading...</Heading> : children}
      </Box>
    </AdvisorContext.Provider>
  );
};

export default BaseLayout;
