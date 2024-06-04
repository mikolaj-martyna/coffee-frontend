import Product from "./Product";
import Box from "@mui/material/Box";
import {Alert} from "@mui/material";
import React, {useEffect, useState} from "react";

export default function Products() {
    const [status, setStatus] = useState("");
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const dataFetch = async () => {
            let res = await fetch("http://localhost:8080/product/get/all", {
                method: "GET"
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
        return <Alert severity="info">Loading...</Alert>
    }

    const listOfProducts = data.map(product => {
        return <Product id={product.id}
                        name={product.name}
                        description={product.description}
                        price={Number.parseFloat(product.price / 100).toFixed(2)}
                        imageUrl={product.imagePath}/>
    })

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
            {listOfProducts}
        </Box>
    );
}