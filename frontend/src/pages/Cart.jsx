import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, SimpleGrid, Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('cartData')) || [];
        setCartItems(data);
    }, []);

    const removeFromCart = (item) => {
        const updatedItems = cartItems.filter((cartItem) => cartItem.dish._id !== item.dish._id);
        setCartItems(updatedItems);
        localStorage.setItem('cartData', JSON.stringify(updatedItems));
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

        axios
            .post('http://localhost:8800/api/order', {
                headers: {
                    Authorization: `${token}`,
                }
            }, orderData)
            .then((response) => {
                toast({
                    title: 'Order placed successfully!',
                    status: 'success',
                    isClosable: true,
                    position: 'top',
                    duration: 3000,
                });

                // Clear the cart and navigate to the order summary page
                localStorage.removeItem('cartData');
                setCartItems([]);
                console.log(response.data);
                // navigate('/order-summary', { state: response.data });
            })
            .catch((error) => {
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

    return (
        <Box p={4}>
            <Heading as="h1" size="xl" mb={4}>
                Cart
            </Heading>

            {cartItems.length === 0 ? (
                <Text>No items in the cart</Text>
            ) : (
                <SimpleGrid columns={2} spacing={4}>
                    {cartItems.map((item) => (
                        <Box key={item.dish._id} p={4} borderWidth={1} borderRadius="md">
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
            )}

            {cartItems.length > 0 && (
                <>
                    <Text mt={4} fontSize="xl" fontWeight="bold">
                        Total: ${calculateTotal()}
                    </Text>

                    <Button mt={4} colorScheme="teal" onClick={checkout}>
                        Checkout
                    </Button>
                </>
            )}
        </Box>
    );
};

export default Cart;
