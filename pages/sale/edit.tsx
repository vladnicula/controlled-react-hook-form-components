import Head from 'next/head'
import { CarSaleForm, CarSaleFormValues } from '@/src/CarSaleForm/CarSaleForm'
import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'

const apiCallMethodOnClientForGettingCarSaleData = async (_id: string) => {
    const httpResponse = await fetch('/api/car-sale')
    const json = await httpResponse.json()
    if ( json.success ) {
        return json.data
    }
}

export default function EditarSalePage() {
    // should be outside of this component
    const logSubmitData = async (data: CarSaleFormValues) => {
        console.log("update existing form data", data)
        const httpResponse = await fetch('/api/car-sale', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const json = await httpResponse.json()

        console.log("update success", json)
    }

    const [loadingInitialData, setLoadingInitialData] = useState(true)
    const [theData, setTheData] = useState<CarSaleFormValues | null>(null)
    const [fakeId] = useState('1234')

    useEffect(() => {
    
        apiCallMethodOnClientForGettingCarSaleData(fakeId)
            .then((data) => {
                setTheData(data)
                setLoadingInitialData(false)
            })
            .catch(() => {
                console.log('error service handler here maybe?')
            })

        // not dealing with unmount, or aborting call on unmount/naviate away
    }, [fakeId])

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
                    locked={loadingInitialData}
                    header={<Typography variant="h4" gutterBottom>Edit Car Sale</Typography>}
                    onSubmitReady={logSubmitData}
                    values={theData ? theData : undefined}
                />
            </div>
        </>
    )
}
