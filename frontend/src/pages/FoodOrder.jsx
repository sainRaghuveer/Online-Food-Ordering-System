import { Box, Button, Heading, Image, SimpleGrid, Spinner, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const FoodOrder = () => {
    const [dishes, setDishes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const toast = useToast();

    useEffect(() => {
        // Fetching dish data from the API
        const user = JSON.parse(localStorage.getItem('User'));
        const token = user.user.token;
        axios.get('/api/dish', {
            headers: {
                Authorization: `${token}`,
            }
        })
            .then((response) => {
                setDishes(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log('Error fetching dish data:', error);
                setIsLoading(false);
            });

        axios.get('/api/cart', {
            headers: {
                Authorization: token,
            },
        })
            .then((response) => {
                setCartItems(response.data);
            })
            .catch((error) => {
                console.log('Error fetching cart data:', error);
            });
    }, []);

    const handleAddToCart = (dish) => {
        const user = JSON.parse(localStorage.getItem('User'));
        const token = user.user.token;

        axios.post('/api/cart', { dish: dish._id, deliveryTime: '2 Hrs' }, {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then((response) => {
                toast({
                    title: response.data.message||'Added to cart',
                    status: 'success',
                    isClosable: true,
                    position: 'top',
                    duration: 3000,
                });
            })
            .catch((error) => {
                console.log('Error adding to cart:', error);
                toast({
                    title: 'Error adding to cart',
                    description: 'Please try again later.',
                    status: 'error',
                    isClosable: true,
                    position: 'top',
                    duration: 3000,
                });
            })

        // Fetching cart data
        axios.get('/api/cart', {
            headers: {
                Authorization: token,
            },
        })
            .then((response) => {
                setCartItems(response.data);
            })
            .catch((error) => {
                console.log('Error fetching cart data:', error);
            });

    };

    return (
        <>
            <Navbar cartItems={cartItems} />

            <Box p={4}>
                <Heading as="h1" size="xl" mb={4}>
                    Menu
                </Heading>

                {isLoading ? (
                    <Spinner size="xl" />
                ) : (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 2, xl: 3, "2xl": 4 }} spacing={8}>
                        {dishes.map((dish) => (
                            <Box key={dish._id} p={4} borderWidth={1} borderRadius="md">
                                <Box width="300px" margin="auto">
                                    <Image src={dish.image} alt={dish.name} mb={4} borderRadius="md" width="100%" height="250px" />
                                </Box>
                                <Text fontSize="xl" fontWeight="bold" mb={2}>
                                    {dish.name}
                                </Text>
                                <Text mb={2}>{dish.description}</Text>
                                <Text color="gray.600" mb={2}>
                                    Price: ${dish.price}
                                </Text>

                                <Button colorScheme="teal" onClick={() => handleAddToCart(dish)}>
                                    Add to Order
                                </Button>
                            </Box>
                        ))}
                    </SimpleGrid>
                )}
            </Box>
        </>
    );
};

export default FoodOrder;
