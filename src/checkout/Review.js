import * as React from 'react';
import {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {Alert} from "@mui/material";

export default function Review({formData}) {
    const [status, setStatus] = useState("");
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const dataFetch = async () => {
            let res = await fetch("https://spring.skni.umcs.pl/api/cart/get", {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });

            const json = await res.json();

            if (res.status === 200) {
                setStatus("success");
                setData(json);
                setLoading(false);
            } else {
                setStatus("error");
            }
        };

        dataFetch();
    }, []);

    if (isLoading) {
        return <Alert severity="info">Loading...</Alert>
    }

    const addresses = [formData["address1"], formData["address2"], formData["city"], formData["zip"], formData["country"]];

    let cartTotal = 0
    data.map((product) => cartTotal += product.price)

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {data.map((product) => (
                    <ListItem key={product.name} sx={{py: 1, px: 0}}>
                        <ListItemText primary={product.name} secondary={product.description}/>
                        <Typography variant="body2">{Number.parseFloat(product.price / 100).toFixed(2)} zł</Typography>
                    </ListItem>
                ))}
                <ListItem sx={{py: 1, px: 0}}>
                    <ListItemText primary="Total"/>
                    <Typography variant="subtitle1" sx={{fontWeight: 700}}>
                        {Number.parseFloat(cartTotal / 100).toFixed(2)} zł
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{mt: 2}}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>{addresses.join(', ')}</Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}