import Head from 'next/head'
import { CarSaleForm } from '@/src/CarSaleForm/CarSaleForm'
import { useEffect, useMemo, useState } from 'react'

export default function NewCarSalePage() {

    const [ asyncCheckBoxValue, setAsyncValue ] = useState<boolean | undefined>(undefined)

    useEffect(() => {
        setTimeout(() => {
            setAsyncValue(true)
        }, 1000)
    }, [])

    const controlledFormValues = useMemo(() => {
        return {
            agreeToTerms: asyncCheckBoxValue ?? false
        }
    }, [asyncCheckBoxValue])


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
                <div>
                    <CarSaleForm
                        values={controlledFormValues}
                    />
                </div>
            </div>
        </>
    )
}
