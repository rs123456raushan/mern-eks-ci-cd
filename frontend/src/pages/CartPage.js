import React, { useState, useEffect } from 'react';
import API from '../api/api';
import {
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [item, setItem] = useState(null)
    const [error, setError] = useState(null)
    const [shippingAddress, setShippingAddress] = useState(null)
    const [openDialog, setOpenDialog] = useState(false)

    const placeOrder = async () => {
        try {
            await API.post('/order/place', {
                id: item._id,
                shippingAddress
            });
            alert('Your order has been placed!');
            setItem(null)
            setOpenDialog(false)
            fetchCart()
        } catch (error) {
            console.error(error);
            setError(error.response.data.message)
            alert(error.response.data.message);
            setItem(null)
            setOpenDialog(false)
        }
    }

    const fetchCart = async () => {
        try {
            const { data } = await API.get('/cart');
            console.log('Cart ===>', data);
            setCart(data.cartItems ? data.cartItems : []);
        } catch (error) {
            console.error(error);
            setError(error.response.data.message)
            alert(error.response.data.message);
        }
    };

    const handleClick = (cartItem) => {
        setItem(cartItem)
        setOpenDialog(true)
    }

    const handleClose = () => {
        setItem(null)
        setOpenDialog(false)
    }

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <>
            {!error ?
                <Typography style={{ marginTop: '25px', textAlign: 'center', fontWeight: 'bold' }} variant="h5" component="h1" gutterBottom>
                    {cart.length <= 0 ? 'You cart is empty' : 'Your Cart'}
                </Typography> :
                <Typography style={{ marginTop: '25px', textAlign: 'center', fontWeight: 'bold' }} variant="h5" component="h1" gutterBottom>
                    {error}
                </Typography>}
            <Grid container spacing={2} sx={{ padding: 2 }}>
                {cart.length >= 0 && cart.map((cart) => (
                    <Grid item xs={12} sm={6} md={4} key={cart._id}>
                        <Card sx={{ height: "100%" }}>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {cart.productId.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Price: ${cart.productId.price}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Quantity: {cart.quantity}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => handleClick(cart)} variant="contained" size="small">
                                    Place Order
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>Provide Shipping Address</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Shipping Address"
                        fullWidth
                        margin="normal"
                        name="shippingAddress"
                        onChange={(e) => setShippingAddress(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={placeOrder} color="primary">
                        Place Order
                    </Button>
                </DialogActions>
            </Dialog >
        </>
    );
};

export default CartPage;
