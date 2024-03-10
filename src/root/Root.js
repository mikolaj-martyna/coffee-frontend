import {Outlet} from "react-router-dom";
import Button from "@mui/material/Button";
import {Link} from 'react-router-dom';

export default function Root() {
    return (
        <>
            <Button component={Link} to="/login">Login</Button>
            <Button component={Link} to="/register">Register</Button>
            <Button component={Link} to="/products">Products</Button>
            <Button component={Link} to="/checkout">Checkout</Button>

            <Outlet/>
        </>
    );
}