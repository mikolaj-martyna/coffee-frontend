// src/pages/ProductPage.jsx
import React from 'react';
import {Container, Typography, Box, Card, CardMedia, CardContent, Button, Grid} from '@mui/material';
import {Link} from 'react-router-dom';

export default function Product() {
    const product = {
        id: 1,
        name: 'Example Product',
        description: 'This is an example product description.',
        price: 99.99,
        imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    };

    return (
        <Card sx={{maxWidth: 345, marginBottom: 2, marginX: 4}}>
            <CardMedia
                component="img"
                height="150"
                image={product.imageUrl}
                alt={product.name}
            />
            <CardContent>
                <Typography variant="h6" color="text.primary">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
            </CardContent>
            <Box display="flex" justifyContent="space-between" p={2}>
                <Typography variant="h6">${product.price}</Typography>
                <Button variant="contained" color="primary" component={Link} to="/checkout">
                    Add to cart
                </Button>
            </Box>
        </Card>
    );
};
