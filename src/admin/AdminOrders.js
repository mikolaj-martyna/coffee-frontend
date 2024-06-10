import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import {MenuItem} from "@mui/material";

const OrderStatus = {
    AWAITING_PAYMENT: 'AWAITING_PAYMENT',
    PAID: 'PAID',
    PREPARATION: 'PREPARATION',
    SHIPPING: 'SHIPPING',
    DELIVERED: 'DELIVERED'
}

export default function AdminOrders() {
    const [status, setStatus] = React.useState("");
    const [data, setData] = React.useState([]);
    const [isLoading, setLoading] = React.useState(true);
    const [openAdd, setOpenAdd] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [selectedOrder, setSelectedOrder] = React.useState({});

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await fetch("http://localhost:8080/order/get/all", {
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                });
                const json = await res.json();
                if (res.ok) {
                    setStatus("success");
                    setData(json);
                    setLoading(false);
                } else {
                    setStatus("error");
                }
            } catch (error) {
                console.error(error);
                setStatus("error");
            }
        };
        fetchData();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'customerName', headerName: 'Customer Name', width: 150 },
        { field: 'date', headerName: 'Order Date', width: 180 },
        { field: 'items', headerName: 'Items', width: 250 },
        { field: 'status', headerName: 'Status', width: 120 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <>
                    <Button variant="contained" color="primary" onClick={() => handleEditOpen(params.row)}>
                        Edit
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(params.row.id)}>
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    const handleAddOpen = () => setOpenAdd(true);
    const handleAddClose = () => setOpenAdd(false);

    const handleEditOpen = (order) => {
        setSelectedOrder(order);
        setOpenEdit(true);
    };

    const handleEditClose = () => setOpenEdit(false);

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:8080/order/delete/${id}`, {
                method: "DELETE",
            });
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddSubmit = async (event) => {
        event.preventDefault();
        // Implement the logic to add a new order
        // This could involve sending a POST request to your backend
        handleAddClose();
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        // Implement the logic to update the selected order
        // This could involve sending a PUT/PATCH request to your backend
        handleEditClose();
    };

    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <div style={{ height: 800, width: '100%' }}>
            <DataGrid rows={data} columns={columns} pageSize={5} />
            <Dialog open={openEdit} onClose={handleEditClose}>
                <DialogTitle>Edit Order</DialogTitle>
                <form onSubmit={handleEditSubmit}>
                    {/* Form fields for editing order */}
                    <TextField defaultValue={selectedOrder.customerName} margin="dense" id="customerName" label="Customer Name" fullWidth />
                    <TextField defaultValue={selectedOrder.date} margin="dense" id="date" label="Date" type="date" fullWidth />
                    <TextField defaultValue={selectedOrder.items} margin="dense" id="items" label="Items" fullWidth />
                    <TextField select defaultValue={selectedOrder.status} margin="dense" id="status" label="Status" fullWidth>
                        <MenuItem value={OrderStatus.AWAITING_PAYMENT}>Awaiting Payment</MenuItem>
                        <MenuItem value={OrderStatus.PAID}>Paid</MenuItem>
                        <MenuItem value={OrderStatus.PREPARATION}>Preparation</MenuItem>
                        <MenuItem value={OrderStatus.SHIPPING}>Shipping</MenuItem>
                        <MenuItem value={OrderStatus.DELIVERED}>Delivered</MenuItem>
                    </TextField>
                    <DialogActions>
                        <Button onClick={handleEditClose}>Cancel</Button>
                        <Button type="submit">Update Order</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
