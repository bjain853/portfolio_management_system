import {
  AbsoluteCenter,
  Box,
  Button,
  Card,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../url";

interface SignUpInfo {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
async function authHandler(signUpInfo: SignUpInfo): Promise<string | null> {
  try {
    const response = await api.post(`/auth/signup`, signUpInfo);
    if (response.status === 200) {
      const advisorProfile = response.data;
      localStorage.setItem("advisorId", JSON.stringify(advisorProfile.id));
      return advisorProfile.id;
    } else {
      console.error(response.status);
    }
  } catch (e: any) {
    console.error(e);
  }
  return null;
}

export default function Login() {
  const [form, setForm] = useState<SignUpInfo>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate();

  function handleChange(e: any) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const onSubmitHandler = async () => {
    const advisorId = await authHandler(form);
    if (advisorId) navigate("/");
    else navigate("/login");
  };

  return (
    <Box height="100vh" bg="gray.100">
      <Box bg="teal.600" color="white" width="100vw">
        <Center>
          <Heading my="1em" size="2xl">
            Wells Fargo Portfolio Management
          </Heading>
        </Center>
      </Box>
      <AbsoluteCenter>
        <Card p="6rem" zIndex="4">
          {/* <Center pb="3em">
		  <Heading>LOGIN</Heading>
		</Center> */}
          <FormControl>
            <FormLabel pt="1em">First Name</FormLabel>
            <Input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              bg="white"
            />
            <FormLabel pt="1em">Last Name</FormLabel>
            <Input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              bg="white"
            />
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={form.email}
              bg="white"
              onChange={handleChange}
            />
            <FormLabel pt="1em">Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              bg="white"
            />
            <Center>
              <Button
                size="lg"
                mt="2em"
                py="20px"
                px="6em"
                variant="solid"
                _hover={{
                  bg: "teal",
                  color: "white",
                }}
                onClick={onSubmitHandler}
              >
                Sign Up
              </Button>
            </Center>
          </FormControl>
        </Card>
      </AbsoluteCenter>
    </Box>
  );
}
