import {Outlet} from "react-router-dom";
import Button from "@mui/material/Button";
import {Link} from 'react-router-dom';
import Typography from "@mui/material/Typography";

export default function Admin() {
    const Logout = () => {
        localStorage.removeItem("token");

        window.location.reload();

        return 'Logged out';
    };

    return (
        <>
            <Typography variant="h5">Admin panel</Typography>
            <Button component={Link} to="/admin/products">Products</Button>
            <Button component={Link} to="/admin/orders">Orders</Button>

            {localStorage.getItem("token") === null ?
                <>
                    <Button component={Link} to="/login">Login</Button>
                    <Button component={Link} to="/register">Register</Button>
                </>
                :
                <>
                    <Button component={Link} onClick={Logout}>Logout</Button>
                </>
            }

            <Outlet/>
        </>
    );
}