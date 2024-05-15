import Product from "./Product";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function Products() {
    const products = [
        {
            id: 1,
            imageUrl: "https://placehold.co/150",
            name: "Placeholder",
            description: "Lorem ipsum",
            price: 199.99
        },
        {
            id: 2,
            imageUrl: "https://placehold.co/150",
            name: "Anomaly",
            description: "Keine Anung",
            price: 29.99
        },
        {
            id: 3,
            imageUrl: "https://placehold.co/150",
            name: "Hello World",
            description: "Hi :3",
            price: 4.99
        },
    ]

    const listOfProducts = products.map(product => {
        return <Product id={product.id} name={product.name} description={product.description} price={product.price}
                 imageUrl={product.imageUrl}/>
    })

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
            {listOfProducts}
        </Box>
    );
}