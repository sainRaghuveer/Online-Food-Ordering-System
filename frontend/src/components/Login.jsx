import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, Button, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = async () => {
    setShow(!show)
  }

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    // console.log(email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `http://localhost:8800/api/login`,
        { email, password },
        config
      );

      // console.log(JSON.stringify(data));
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      localStorage.setItem("User", JSON.stringify(data));
      setLoading(false);
      navigate("/order");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  }
  return (
    <VStack spacing="5px">
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input type='email' value={email} placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)}></Input>
      </FormControl>
      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button ml="15px" variant={'ghost'} h="1.75rem" size="sm" padding="20px" onClick={handleClick}>
              {show ? <ViewIcon/> : <ViewOffIcon/>}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
    </VStack>
  )
}

export default Login