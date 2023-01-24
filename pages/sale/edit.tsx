import Head from 'next/head'
import { CarSaleForm } from '@/src/CarSaleForm/CarSaleForm'


export default function EditarSalePage() {
    return (
        <>
            <Head>
                <title>Edit Car Sale Page</title>
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
                />
            </div>
        </>
    )
}
