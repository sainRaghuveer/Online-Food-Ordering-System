import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, SimpleGrid, Button, useToast, Avatar } from '@chakra-ui/react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [orderSummary, setOrderSummary] = useState(null);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('User'));
        const token = user.user.token;

        // Fetch cart data
        axios
            .get('/api/cart', {
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

    const removeFromCart = (item) => {
        const updatedItems = cartItems.filter((cartItem) => cartItem._id !== item._id);
        setCartItems(updatedItems);
        // Update cart data in the backend
        const user = JSON.parse(localStorage.getItem('User'));
        const token = user.user.token;
        axios
            .delete(`/api/cart/${item._id}`, {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                console.log(response.data);
                toast({
                    title: 'Remover from cart successfully!',
                    status: 'success',
                    isClosable: true,
                    position: 'top',
                    duration: 3000,
                });
            })
            .catch((error) => {
                console.log('Error removing item from cart:', error);
                toast({
                    title: 'Remover from cart successfully!',
                    status: 'warning',
                    isClosable: true,
                    position: 'top',
                    duration: 3000,
                });
            });
    };

    const calculateTotal = () => {
        let total = 0;
        cartItems.forEach((item) => {
            total += item.dish.price * item.quantity;
        });
        return total.toFixed(2);
    };

    const checkout = () => {
        const orderData = {
            dishes: cartItems.map((item) => ({
                dish: item.dish._id,
                quantity: item.quantity,
            })),
            total: calculateTotal(),
            deliveryTime: '2 Hrs',
        };

        const user = JSON.parse(localStorage.getItem('User'));
        const token = user.user.token;
        setLoading(true);
        axios
            .post('/api/order', orderData, {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                toast({
                    title: 'Order placed successfully!',
                    status: 'success',
                    isClosable: true,
                    position: 'top',
                    duration: 3000,
                });

                // Clear the cart
                axios
                    .delete('/api/cart', {
                        headers: {
                            Authorization: token,
                        },
                    })
                    .then(() => {
                        setLoading(false);
                        setCartItems([]);
                    })
                    .catch((error) => {
                        setLoading(false);
                        console.log('Error clearing cart:', error);
                    });

                setOrderSummary(response.data.order);
            })
            .catch((error) => {
                setLoading(false);
                console.log('Error placing order:', error);
                toast({
                    title: 'Error placing order',
                    description: 'Please try again later.',
                    status: 'error',
                    isClosable: true,
                    position: 'top',
                    duration: 3000,
                });
            });
    };

    const handleHomeFromCart = () => {
        navigate("/order");
    }

    return (
        <Box p={4}>
            <Heading as="h1" size="xl" mb={4}>
                {orderSummary ? "ORDER SUMMARY" : "Cart"}
            </Heading>

            {cartItems.length === 0 ? (
                orderSummary ? (
                    <Box mt={4} borderWidth={1} borderRadius="md" p={4}>
                        <Text as="h2" size="lg" mb={2}>
                            Order Summary
                        </Text>
                        <Text>Total: ${orderSummary.total}</Text>
                        <Text>Delivery Time: {orderSummary.deliveryTime}</Text>
                        <TableContainer>
                            <Table variant="simple">
                                <TableCaption>Thank you for ordering food with us</TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>Image</Th>
                                        <Th>Name</Th>
                                        <Th isNumeric>Quantity</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {orderSummary?.dishes.map((item) => (
                                        <Tr key={uniqid()}>
                                            <Td>
                                                <Avatar name={item.dish.name} src={item.dish.image} />
                                            </Td>
                                            <Td>{item.dish.name}</Td>
                                            <Td isNumeric>{item.quantity}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                        <Button onClick={handleHomeFromCart}>let's buy more food...</Button>
                    </Box>
                ) : (
                    <Text>No items in the cart</Text>
                )
            ) : (
                <>
                    <SimpleGrid columns={2} spacing={4}>
                        {cartItems.map((item) => (
                            <Box key={item._id} p={4} borderWidth={1} borderRadius="md">
                                <Text fontSize="xl" fontWeight="bold" mb={2}>
                                    {item.dish.name}
                                </Text>
                                <Text mb={2}>Quantity: {item.quantity}</Text>
                                <Text color="gray.600" mb={2}>
                                    Price: ${item.dish.price}
                                </Text>

                                <Button colorScheme="red" onClick={() => removeFromCart(item)}>
                                    Remove
                                </Button>
                            </Box>
                        ))}
                    </SimpleGrid>

                    <Text mt={4} fontSize="xl" fontWeight="bold">
                        Total: ${calculateTotal()}
                    </Text>
                    <Button mt={4} colorScheme="teal" onClick={checkout} isLoading={loading}>
                        Checkout
                    </Button>
                </>
            )}
        </Box>
    );
};

export default Cart;
