import {Link, Outlet} from "react-router-dom";
import Button from "@mui/material/Button";

export default function Root() {
    const Logout = () => {
        localStorage.removeItem("token");

        window.location.reload();

        return 'Logged out';
    };

    return (
        <>
            <Button component={Link} to="/products">Products</Button>
            <Button component={Link} to="/checkout">Checkout</Button>

            {localStorage.getItem("token") === null ?
                <>
                    <Button component={Link} to="/login">Login</Button>
                    <Button component={Link} to="/register">Register</Button>
                </>
                :
                <>
                    <Button component={Link} to="/profile">Profile</Button>
                    <Button component={Link} onClick={Logout}>Logout</Button>
                </>
            }

            <Outlet/>
        </>
    );
}