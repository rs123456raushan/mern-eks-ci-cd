import React, { useEffect, useState } from 'react';
import API from '../api/api';
import ProductCard from '../components/ProductCard';
import { Grid, Typography } from "@mui/material";

const ProductsPage = () => {
    const [error, setError] = useState(null)
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await API.get('/products');
                setProducts(data);
            } catch (error) {
                console.error(error)
                setError(error.response.data.message)
                alert(error.response.data.message);
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            {!error ?
                <Typography style={{ marginTop: '25px', textAlign: 'center', fontWeight: 'bold' }} variant="h5" component="h1" gutterBottom>
                    Products
                </Typography> :
                <Typography style={{ marginTop: '25px', textAlign: 'center', fontWeight: 'bold' }} variant="h5" component="h1" gutterBottom>
                    {error}
                </Typography>}
            <Grid container spacing={2} sx={{ padding: 2 }}>
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </Grid>
        </>
    );
};

export default ProductsPage;
