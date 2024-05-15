// src/pages/ProductPage.jsx
import React from 'react';
import {Typography, Box, Card, CardMedia, CardContent, Button} from '@mui/material';
import {Link} from 'react-router-dom';

export default function Product(product) {

    return (
        <Card sx={{minWidth: 200, maxWidth: 300, marginBottom: 2, marginX: 4}}>
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
            <Box display="flex" p={2}>
                <Typography variant="h6" pr={2}>${product.price}</Typography>
                <Button variant="contained" color="primary" component={Link} to="/checkout">
                    Add to cart
                </Button>
            </Box>
        </Card>
    );
};
