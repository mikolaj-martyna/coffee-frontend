import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import Review from './Review';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Coffee Lovers
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// const steps = ['Shipping address', 'Payment details', 'Review your order'];
const steps = ['Shipping address', 'Review your order'];

function getStepContent(step, handleInputChange, formData) {
    switch (step) {
        case 0:
            return <AddressForm onChange={handleInputChange} formData={formData}/>;
        // case 1:
        //     return <PaymentForm onChange={handleInputChange} formData={formData}/>;
        case 1:
            return <Review formData={formData}/>;
        default:
            throw new Error('Unknown step');
    }
}

export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [formData, setFormData] = React.useState({
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        cardName: '',
        cardNumber: '',
        expDate: '',
        cvv: ''
    });
    const [status, setStatus] = useState("");

    const handleInputChange = (name, value) => {
        setFormData({...formData, [name]: value});
    };

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            handleCheckout()
        }

        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleCheckout = async (event) => {
        await fetch("https://spring.skni.umcs.pl/api/user/edit", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                name: "",
                surname: "",
                email: "",
                country: formData.country,
                city: formData.city,
                street: formData.address1 + " " + formData.address2,
                zipCode: formData.zipCode,
                buildingNumber: formData.buildingNumber,
                apartmentNumber: formData.apartmentNumber
            })
        });

        let res = await fetch("https://spring.skni.umcs.pl/api/order/create", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        let json = await res.json();
        console.log("response body " + json["url"]);

        window.location.replace(json["url"])
    };

    return (
        <>
            {localStorage.getItem("token") === null ?
                <>
                    <Typography component="h1" variant="h4" align="center">
                        Log in to checkout
                    </Typography>
                </>
                :
                <>
                    <Container component="main" maxWidth="sm" sx={{mb: 4}}>
                        <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                            <Typography component="h1" variant="h4" align="center">
                                Checkout
                            </Typography>
                            <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                            {activeStep === steps.length ? (
                                <React.Fragment>
                                    <Typography variant="h5" gutterBottom>
                                        Thank you for your order.
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        Your order number is #2001539. We have emailed your order
                                        confirmation, and will send you an update when your order has
                                        shipped.
                                    </Typography>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    {getStepContent(activeStep, handleInputChange, formData)}
                                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                        {activeStep !== 0 && (
                                            <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                                                Back
                                            </Button>
                                        )}

                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{mt: 3, ml: 1}}
                                        >
                                            {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                        </Button>
                                    </Box>
                                </React.Fragment>
                            )}
                        </Paper>
                        <Copyright/>
                    </Container>
                </>
            }
        </>
    );
}