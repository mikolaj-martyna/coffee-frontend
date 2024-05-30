import React, {useEffect, useState} from 'react';
import {Typography, Box, Button, Alert} from '@mui/material';

export default function Profile() {
    const [status, setStatus] = useState("");
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const dataFetch = async () => {
            let res = await fetch("http://localhost:8080/user/get", {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 200) {
                setStatus("success");
                setData(data);
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

    if (status === "error") {
        return <Alert severity="error">Error getting user data</Alert>
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                { data["name"] + " " + data["surname"] }
            </Typography>
            <Typography variant="body1" gutterBottom>
                { data["email"] }
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {/* TODO: Add profile info here */}
            </Typography>
            <Box mt={2}>
                <Button variant="contained" color="primary">
                    Edit Profile
                </Button>
                <Button variant="outlined" sx={{ ml: 2 }}>
                    {/* TODO: add orders page */}
                    View orders
                </Button>
            </Box>
        </Box>
    );
};
