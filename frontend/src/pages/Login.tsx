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
import { api } from "../api";

interface LoginInfo {
  username: string;
  password: string;
}
async function authHandler(loginInfo: LoginInfo): Promise<string | null> {
  if (import.meta.env.DEV) {
    const testId = "fef0e0e2-8c7e-463a-af86-651eac2a71fe";
    localStorage.setItem("advisorId", testId);
    return testId;
  }
  try {
    const response = await api.post(`/auth/login`, { loginInfo });
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
  const [form, setForm] = useState<LoginInfo>({ username: "", password: "" });
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
            <FormLabel>Email</FormLabel>
            <Input
              name="username"
              type="email"
              value={form.username}
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
                Login
              </Button>
            </Center>
          </FormControl>
        </Card>
      </AbsoluteCenter>
    </Box>
  );
}
