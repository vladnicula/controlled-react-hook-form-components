import Head from 'next/head'
import { CarSaleForm, CarSaleFormValues } from '@/src/CarSaleForm/CarSaleForm'
import { Typography } from '@mui/material'

export default function EditarSalePage() {
    // should be outside of this component
    const logSubmitData = (data: CarSaleFormValues) => {
        console.log("update existing form data", data)
    }

    return (
        <>
            <Head>
                <title>New Car Sale Page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: "stretch",
                    justifyContent: "center"
                }}
            >
                <CarSaleForm
                    header={<Typography variant="h4" gutterBottom>Edit Car Sale</Typography>}
                    onSubmitReady={logSubmitData}
                />
            </div>
        </>
    )
}
