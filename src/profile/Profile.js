import React, {useEffect, useState} from 'react';
import {Alert, Box, Typography} from '@mui/material';
import Orders from "./Orders";
import CircularProgress from "@mui/material/CircularProgress";

export default function Profile() {
    const [status, setStatus] = useState("");
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const dataFetch = async () => {
            let res = await fetch("https://spring.skni.umcs.pl/api/user/get", {
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
        return <CircularProgress/>;
    }

    if (status === "error") {
        return <Alert severity="error">Error getting user data</Alert>
    }

    return (
        <>
            {localStorage.getItem("token") === null ?
                <>
                    <Typography component="h1" variant="h4" align="center">
                        Log in to see your profile details
                    </Typography>
                </>
                :
                <><Box sx={{padding: 4}}>
                    <Typography variant="h4" gutterBottom>
                        {data["name"] + " " + data["surname"]}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {data["email"]}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {/* TODO: Add profile info here */}
                    </Typography>
                    <Box mt={2}>
                        <Orders/>
                    </Box>
                </Box>
                </>
            }
        </>
    );
};
