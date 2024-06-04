// src/pages/ProductPage.jsx
import React, {useState} from 'react';
import {Typography, Box, Card, CardMedia, CardContent, Button} from '@mui/material';

export default function Product(product) {
    const [status, setStatus] = useState("");
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(true);

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
                <Typography variant="h6" pr={2}>{product.price} zł</Typography>
                <Button variant="contained" color="primary" onClick={async () => {
                    await fetch("http://localhost:8080/cart/add", {
                        method: "POST",
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token'),
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify([product.id])
                    });
                }}>
                    Add to cart
                </Button>
            </Box>
        </Card>
    );
};
