import React from 'react';
import API from '../api/api';
import { Grid, Card, CardContent, Typography, Button, CardActions } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {

    const navigate = useNavigate();

    const addToCart = async (product) => {
        try {
            const { data } = await API.post('/cart/add', {
                productId: product._id,
                quantity: 1
            });
            console.log(data)
            alert('Product added to cart successfully!');
            navigate('/cart')
        } catch (error) {
            console.error(error);
            alert(error.response.data.message);
        }
    };

    return (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ height: "100%" }}>
                <CardContent>
                    <Typography variant="h6" component="div">
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Price: ${product.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Quantity: {product.quantity}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() => addToCart(product)} variant="contained" size="small">
                        Add to Cart
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ProductCard;
