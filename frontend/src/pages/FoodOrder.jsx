import { Box, Button, Heading, Image, SimpleGrid, Spinner, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';

const FoodOrder = () => {
    const [dishes, setDishes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        // Fetching dish data from the API
        const user = JSON.parse(localStorage.getItem('User'));
        const token = user.user.token;
        axios.get('http://localhost:8800/api/dish', {
            headers: {
                Authorization: `${token}`,
            }
        }).then((data) => {
            console.log(data)
            setDishes(data.data);
            setIsLoading(false);
        })
            .catch((error) => {
                console.log('Error fetching dish data:', error);
                setIsLoading(false);
            });
    }, []);

    const handleAddToCart = (dish) => {
        const cartData = JSON.parse(localStorage.getItem('cartData')) || [];

        const existingItemIndex = cartData.findIndex((item) => item.dish._id === dish._id);

        if (existingItemIndex !== -1) {
            // Dish already exists in cart, update quantity
            cartData[existingItemIndex].quantity += 1;
        } else {
            // Dish doesn't exist in cart, add new item
            cartData.push({ dish, quantity: 1 });
        }

        localStorage.setItem('cartData', JSON.stringify(cartData));
        toast({
            title: `Added to cart`,
            status: "success",
            isClosable: true,
            position: "top",
            duration: 3000
        });
    };

    return (
        <>
            <Navbar />

            <Box p={4}>
                <Heading as="h1" size="xl" mb={4}>
                    Menu
                </Heading>

                {isLoading ? (
                    <Spinner size="xl" />
                ) : (
                    <SimpleGrid columns={3} spacing={8}>
                        {dishes.map((dish) => (
                            <Box key={dish._id} p={4} borderWidth={1} borderRadius="md">
                                <Box width="300px" margin="auto">
                                    <Image src={dish.image} alt={dish.name} mb={4} borderRadius="md" width="300px" height="300px" />
                                </Box>
                                <Text fontSize="xl" fontWeight="bold" mb={2}>
                                    {dish.name}
                                </Text>
                                <Text mb={2}>{dish.description}</Text>
                                <Text color="gray.600" mb={2}>
                                    Price: ${dish.price}
                                </Text>

                                <Button colorScheme="teal" onClick={() => handleAddToCart(dish)}>Add to Order</Button>
                            </Box>
                        ))}
                    </SimpleGrid>
                )}
            </Box>
        </>
    );
};

export default FoodOrder;
