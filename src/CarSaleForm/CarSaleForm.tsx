import { Checkbox, FormControl, FormControlLabel, FormHelperText } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from "react-hook-form"

const CarSaleFormSchame = z.object({
    agreeToTerms: z.boolean().refine((value) => {
        return !!value
    }, {
        message: "You must agree to the terms"
    })
})

type CarSaleFormValue = z.infer<typeof CarSaleFormSchame>

interface CarSaleFormProps {
    values?: CarSaleFormValue
}

export const CarSaleForm = (props: CarSaleFormProps) => {
    const { control, handleSubmit } = useForm({
        resolver: zodResolver(CarSaleFormSchame),
        values: props.values,
    })

    return (
        <form
            onSubmit={handleSubmit((data) => {
                console.log(`handleSubmit`, data)
            })}
        >
            <h2>Form Here</h2>

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
