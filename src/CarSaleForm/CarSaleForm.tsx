import { Checkbox, FormControl, FormControlLabel, FormHelperText, TextField } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from "react-hook-form"

const CarSaleFormSchame = z.object({
    price: z.number().min(100),
    agreeToTerms: z.boolean().refine((value) => {
        return !!value
    }, {
        message: "You must agree to the terms"
    })
})

type CarSaleFormValue = z.infer<typeof CarSaleFormSchame>

interface CarSaleFormProps {
    values?: Partial<CarSaleFormValue>
}

export const CarSaleForm = (props: CarSaleFormProps) => {
    const { control, handleSubmit } = useForm({
        resolver: zodResolver(CarSaleFormSchame),
        values: props.values,
    })

    const inputRefTest = useRef<HTMLInputElement>()
    useEffect(() => {
        setTimeout(() => {
            inputRefTest.current?.focus()
        }, 1000)
    }, [])

    return (
        <form
            onSubmit={handleSubmit((data) => {
                console.log(`handleSubmit`, data)
            })}
        >
            <h2>Form Here</h2>

            <Controller
                name="price"
                control={control}
                render={({ field, fieldState: {error} }) => (
                    <FormControl sx={{ m: 3 }} error={!!error} component="fieldset" variant="standard">
                        <TextField
                            id="asking-price"
                            label="Asking Price"
                            inputRef={field.ref}
                            // TODO props based transfomer here
                            value={field.value ?? ""}
                            // TODO props based transfomer here
                            onChange={(ev) => {
                                const value = ev.target.value
                                const numericValue = parseFloat(value)
                                if  ( isNaN(numericValue) || value.length !== numericValue.toString().length ) {
                                    return field.onChange(value) 
                                }
                                return field.onChange(numericValue) 
                            }}
                            onBlur={field.onBlur}
                        />
                        {error?.message ? <FormHelperText>{error?.message}</FormHelperText> : null }
                    </FormControl>
                )}
            />

            <Controller
                name="agreeToTerms"
                control={control}
                render={({ field, fieldState: {error} }) => (
                    <FormControl sx={{ m: 3 }} error={!!error} component="fieldset" variant="standard">
                        <FormControlLabel
                            control={(
                                <Checkbox
                                    inputRef={field.ref}
                                    checked={field.value ?? false}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            )}
                            label="Antoine Llorca"
                        />
                        {error?.message ? <FormHelperText>{error?.message}</FormHelperText> : null }
                    </FormControl>
                )}
            />

            <button type="submit">Ok</button>
        </form>
    )
}
