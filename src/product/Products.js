import Product from "./Product";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function Products() {
    return (
       <Box sx={{display: 'flex', justifyContent: 'center'}}>
           <Product/>
           <Product/>
           <Product/>
       </Box>
    );
}