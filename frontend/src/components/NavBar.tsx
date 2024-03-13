import { Stack, Text, Circle, Button, useColorMode } from "@chakra-ui/react";
import { useContext } from "react";
import { AdvisorContext } from "../BaseLayout";
import { Advisor } from "../types/advisor";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const advisorProfile: Advisor | null = useContext(AdvisorContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  return (
    <Stack
      direction={{ base: "column", lg: "row" }}
      spacing="2em"
      alignItems="center"
    >
      <Button onClick={toggleColorMode}>
        Switch To {colorMode === "light" ? "Dark" : "Light"}
      </Button>
      <Circle bg="teal.500" p="1em" textColor="white" fontWeight="bold">
        {advisorProfile?.firstName[0]} {advisorProfile?.lastName[0]}
      </Circle>
      <Button
        variant="ghost"
        onClick={() => {
          localStorage.removeItem("advisorId");
          navigate("/login");
        }}
      >
        <Text size="md" fontWeight="bold">
          Logout
        </Text>
      </Button>
    </Stack>
  );
}
