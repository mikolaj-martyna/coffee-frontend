// Import necessary MUI components
import React, {useEffect, useState} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import CircularProgress from "@mui/material/CircularProgress";

export default function Orders() {
    const [status, setStatus] = useState("");
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const dataFetch = async () => {
            let res = await fetch("https://spring.skni.umcs.pl/api/order/get/user", {
                method: "GET", headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });

            const json = await res.json();
            console.log(json);

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
        return <CircularProgress/>;
    }

    return (<TableContainer>
        <Typography variant="h5" sx={{p: 2}}>
            Orders
        </Typography>
        <Table aria-label="orders table">
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Customer Name</TableCell>
                    <TableCell align="right">Order Date</TableCell>
                    <TableCell align="right">Items</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((order) => (
                    <TableRow key={order.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                        <TableCell component="th" scope="row">{order.id}</TableCell>
                        <TableCell align="right">{order.status}</TableCell>
                        <TableCell
                            align="right">{`${String(order.date[2]).padStart(2, '0')}.${String(order.date[1]).padStart(2, '0')}.${order.date[0]} ${order.date[3]}:${String(order.date[4]).padStart(2, '0')}`}</TableCell>
                        <TableCell align="right">{order.productIds.map(product => `[${product}] `)}</TableCell>
                    </TableRow>))}
            </TableBody>
        </Table>
    </TableContainer>);
};
