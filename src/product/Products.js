import Product from "./Product";
import Box from "@mui/material/Box";
import React, {useEffect, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function Products() {
    const [status, setStatus] = useState("");
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const dataFetch = async () => {
            let res = await fetch("spring.skni.umcs.pl/api/product/get/all", {
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
        return <CircularProgress/>;
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