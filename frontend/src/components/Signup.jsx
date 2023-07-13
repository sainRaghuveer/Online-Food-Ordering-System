import { FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, Button, useToast } from '@chakra-ui/react'
import React, { useState } from 'react';
import axios from "axios"
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const toast = useToast()

  const handleClick = () => {
    setShow(!show)
  }

   
  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    console.log("Raghu")
    try {
        let obj={
            name:name,
            email:email,
            password:password
        }
      const res = await axios.post(`http://localhost:8800/api/register`,obj,{
        headers: {
            "Content-type": "application/json",
          },
      });

      console.log(res);

      if(res.data.msg=="User Already Exists"){
        toast({
            title: "User Already Exists",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          setLoading(false);
      }else{
        toast({
            title: "Registration Successful, Now login with same credentials",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          localStorage.setItem("User", JSON.stringify(res.data));
          setLoading(false);
      }
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error,
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
      <FormControl id='first-name' isRequired>
        <FormLabel>Name</FormLabel>
        <Input type='text' value={name} placeholder='Enter your name' onChange={(e) => setName(e.target.value)}></Input>
      </FormControl>
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
              {show ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id='confirmPassword' isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={confirmpassword}
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button ml="15px" variant={'ghost'} h="1.75rem" size="sm" padding="20px" onClick={handleClick}>
              {show ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={Loading}
      >
        Sign Up
      </Button>
    </VStack>
  )
}

export default Signup