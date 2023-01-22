import Head from 'next/head'
import { CarSaleForm, CarSaleFormValues } from '@/src/CarSaleForm/CarSaleForm'
import { Typography } from '@mui/material'

export default function NewCarSalePage() {

    const logSubmitData = async (data: CarSaleFormValues) => {
        console.log("new car form should be submited", data)
        const httpResponse = await fetch('/api/car-sale', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const json = await httpResponse.json()

        console.log("creation success", json)
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
                    header={<Typography variant="h4" gutterBottom>New Car Sale</Typography>}
                    onSubmitReady={logSubmitData}

                />
            </div>
        </>
    )
}
