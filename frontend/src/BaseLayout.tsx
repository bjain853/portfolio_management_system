import { createContext } from "react";

import { Center, ChakraProvider, Container, Heading } from "@chakra-ui/react";
import { useFetchAdvisorProfile } from "./hooks/advisor";

const BaseLayout = ({ children }: any) => {
  const advisorProfile = useFetchAdvisorProfile();
  const AdvisorContext = createContext(advisorProfile);

  return (
    <ChakraProvider>
      <AdvisorContext.Provider value={advisorProfile}>
        <Container minHeight="100vh" minWidth="100vw" bg="gray.200">
          <Center bg="teal" color="white" mb="5em">
            <Heading my="1em">Wells Fargo Portfolio Management</Heading>
          </Center>
          {children}
        </Container>
      </AdvisorContext.Provider>
    </ChakraProvider>
  );
};

export default BaseLayout;
