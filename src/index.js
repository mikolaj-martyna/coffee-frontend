import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./root/Root";
import Login from "./login/Login";
import Register from "./register/Register";
import Checkout from "./checkout/Checkout";
import Products from "./product/Products";
import Profile from "./profile/Profile";
import Admin from "./admin/Admin";
import AdminProducts from "./admin/AdminProducts";
import AdminOrders from "./admin/AdminOrders";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "register",
                element: <Register/>
            },
            {
                path: "products",
                element: <Products/>
            },
            {
                path: "profile",
                element: <Profile/>
            },
            {
                path: "checkout",
                element: <Checkout/>
            }
        ]
    },
    {
        path: "/admin",
        element: <Admin/>,
        children: [
            {
                path: "/admin/products",
                element: <AdminProducts/>
            },
            {
                path: "/admin/orders",
                element: <AdminOrders/>
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
