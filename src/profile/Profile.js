import React, {useState} from 'react';
import {Typography, Box, Button, Alert} from '@mui/material';

export default function Profile() {
    const [status, setStatus] = useState("");

    let user = async () => {
        try {
            let res = await fetch("http://localhost:8080/user/get", {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });

            await res.json();

            if (res.status === 200) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch (err) {
            setStatus("error");
        }
    }

    if (status === "error") {
        return <Alert severity="error">Error getting user data</Alert>
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                { user.name + user.surname }
            </Typography>
            <Typography variant="body1" gutterBottom>
                Software Developer | React Specialist
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Bio: Passionate about creating intuitive web applications. Always eager to learn new technologies and frameworks.
            </Typography>
            <Box mt={2}>
                <Button variant="contained" color="primary">
                    Edit Profile
                </Button>
                <Button variant="outlined" sx={{ ml: 2 }}>
                    View Projects
                </Button>
            </Box>
        </Box>
    );
};
