import {
  AbsoluteCenter,
  Box,
  Button,
  Card,
  Center,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { redirect } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  const onSubmitHandler = () => {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    fetch("/api/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData, // body data type must match "Content-Type" header
    }).then((resonse) => {
      if (resonse.ok) {
        redirect("/");
      }
    });
  };

  return (
    <Box h="100vh">
      <AbsoluteCenter p="10em">
        <Card p="6rem" zIndex="4">
          {/* <Center pb="3em">
            <Heading>LOGIN</Heading>
          </Center> */}
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              bg="white"
              onChange={handleEmailChange}
              placeholder="john.doe@mail.com"
            />
            <FormLabel pt="1em">Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              bg="white"
              placeholder="H@ppyPuppy29"
            />
            <Center>
              <Button
                size="lg"
                mt="2em"
                py="20px"
                px="6em"
                variant="solid"
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
