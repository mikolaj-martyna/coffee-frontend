import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';

export default function AdminProductsPage() {
    const [status, setStatus] = React.useState("");
    const [data, setData] = React.useState([]);
    const [isLoading, setLoading] = React.useState(true);
    const [openAdd, setOpenAdd] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState({});

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await fetch("api/product/get/all", {
                    method: "GET",
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
        {field: 'id', headerName: 'ID', width: 90},
        {field: 'name', headerName: 'Name', width: 150},
        {field: 'description', headerName: 'Description', width: 300},
        {
            field: 'price', headerName: 'Price', width: 130,
            renderCell: (params) => `${(params.value / 100).toFixed(2)} zł`,
        },
        {field: 'imagePath', headerName: 'Image path', width: 200},
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

    const handleEditOpen = (product) => {
        setSelectedProduct(product);
        setOpenEdit(true);
    };

    const handleEditClose = () => setOpenEdit(false);

    const handleDelete = async (id) => {
        try {
            await fetch(`api/product/delete/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            });
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddSubmit = async (event) => {
        event.preventDefault();

        try {
            let res = await fetch("api/product/add", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([{
                    id: 0,
                    name: document.getElementById('name').value,
                    category: document.getElementById('category').value,
                    description: document.getElementById('description').value,
                    price: parseInt(document.getElementById('price').value),
                    imagePath: document.getElementById('imagePath').value
                }])
            });

            await res.json();
            if (res.ok) {
                const fetchRes = await fetch("api/product/get/all", {
                    method: "GET",
                });

                const json = await fetchRes.json();
                if (fetchRes.ok) {
                    setStatus("success");
                    setData(json);
                    setLoading(false);
                } else {
                    setStatus("error");
                }
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }

        handleAddClose();
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        // TODO: update the selected product
        handleEditClose();
    };

    if (isLoading) {
        return <CircularProgress/>;
    }

    return (
        <div style={{height: 800, width: '100%'}}>
            <DataGrid rows={data} columns={columns} pageSize={5}/>
            <Button variant="contained" color="primary" onClick={handleAddOpen}>
                Add Product
            </Button>
            <Dialog open={openAdd} onClose={handleAddClose}>
                <DialogTitle>Add New Product</DialogTitle>
                <form onSubmit={handleAddSubmit}>
                    <TextField margin="dense" id="name" label="Name" required fullWidth/>
                    <TextField margin="dense" id="category" label="Category" fullWidth/>
                    <TextField margin="dense" id="description" label="Description" fullWidth/>
                    <TextField margin="dense" id="price" label="Price" type="number" required fullWidth/>
                    <TextField margin="dense" id="imagePath" label="Image path" fullWidth/>
                    <DialogActions>
                        <Button onClick={handleAddClose}>Cancel</Button>
                        <Button type="submit">Add Product</Button>
                    </DialogActions>
                </form>
            </Dialog>
            <Dialog open={openEdit} onClose={handleEditClose}>
                <DialogTitle>Edit Product</DialogTitle>
                <form onSubmit={handleEditSubmit}>
                    <TextField defaultValue={selectedProduct.name} margin="dense" id="name" label="Name" required
                               fullWidth/>
                    <TextField defaultValue={selectedProduct.category} margin="dense" id="category"
                               label="Description" fullWidth/>
                    <TextField defaultValue={selectedProduct.description} margin="dense" id="description"
                               label="Description" fullWidth/>
                    <TextField defaultValue={selectedProduct.price} margin="dense" id="price" label="Price"
                               type="number" required fullWidth/>
                    <TextField defaultValue={selectedProduct.imageUrl} margin="dense" id="imageUrl" label="Image URL"
                               fullWidth/>
                    <DialogActions>
                        <Button onClick={handleEditClose}>Cancel</Button>
                        <Button type="submit">Update Product</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
