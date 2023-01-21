import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import Button from "@mui/material/Button"
import { RHFTextField } from "../components/form/RHFTextField"
import { RHFCheckboxField } from "../components/form/RHFCheckboxField"
// import { RHFSliderField } from "../components/form/RHFSliderField"
import { RHFAutocompleteField } from "../components/form/RHFAutocompleteField"
import { RHFDatePicker } from "../components/form/RHFDatepickerField"
import { Box, Link, Typography } from "@mui/material"
import { ReactNode } from "react"

const MUIFormSchema = z.object({
    price: z.number().min(1),
    registrationTimestamp: z.number(),
    // slider: z.number().min(20, "You must be willing to give it at least 20%"),
    agreeToS: z.boolean().refine(
        (value) => {
            return value === true
        },
        {
            message: "You must agree to ToS"
        }
    ),
    newsletterOptIn: z.boolean(),
    carMake: z.string(),
    carModel: z.string()
})

export type CarSaleFormValues = z.infer<typeof MUIFormSchema>;

interface MUIComponentsFormProps {
    header?: ReactNode
    onSubmitReady: (data: CarSaleFormValues) => unknown | Promise<unknown>
}

export const CarSaleForm = (props: MUIComponentsFormProps) => {
    const { control, handleSubmit } = useForm<CarSaleFormValues>({
        resolver: zodResolver(MUIFormSchema),
        defaultValues: {
            // slider: 10,
            // radioGroup: 1,
            newsletterOptIn: true,
            agreeToS: false
        }
    })

    return (
        <form
            onSubmit={handleSubmit(props.onSubmitReady)}
            style={{
                width: 420,
                margin: "auto",
                display: "flex",
                flexFlow: "column",
                alignItems: "start",
                gap: 20
            }}
        >
            {props.header}
            {/* <Box sx={{ width: '100%', display: 'flex', alignItems: 'flex-start', gap: '10px' }}> */}
            <RHFTextField
                name="price"
                control={control}
                label="Asking Price"
                transformValue={(value) => parseInt(value, 10)}
                // inputComponentProps={{
                //     startAdornment: <InputAdornment position="start">$</InputAdornment>
                // }}
            />
            <RHFDatePicker
                control={control}
                label="First Registration"
                id="registrationTimestamp"
                name="registrationTimestamp"
            />
            {/* </Box> */}
            
            {/* <RHFRadioGroupField
                id="genderRadio"
                name="radioGroup"
                control={control}
                label="Gender"
                options={[
                    {
                        label: "Female",
                        value: 1
                    },
                    {
                        label: "Male",
                        value: 2
                    },
                    {
                        label: "Other",
                        value: 3
                    }
                ]}
            /> */}



            {/* <Box sx={{ width: '100%', display: 'flex', alignItems: 'flex-start', gap: '10px' }}> */}
            <RHFAutocompleteField
                control={control}
                name="carMake"
                id="carMakeOption"
                placeholder="Car Make"
                options={[
                    {
                        id: "1",
                        label: "Option 1"
                    },
                    {
                        id: "2",
                        label: "Option 2"
                    }
                ]}
            />

            <RHFAutocompleteField
                control={control}
                name="carModel"
                id="carModelOption"
                placeholder="Car Model"
                options={[
                    {
                        id: "1",
                        label: "Option 1"
                    },
                    {
                        id: "2",
                        label: "Option 2"
                    }
                ]}
            />
            {/* </Box> */}

            <RHFCheckboxField
                id="agreeToS"
                name="agreeToS"
                control={control}
                label={
                    <>You must agree to the <Link href='https://www.google.com/' target={"_blank"} rel="noreferrer">The terms and Conditions</Link></>
                }
            />

            <RHFCheckboxField
                id="newsletterOptIn"
                name="newsletterOptIn"
                control={control}
                label="Sign Up up our newsletter"
            />

            {/* <RHFSliderField
                name="slider"
                control={control}
                label="Are you willing to give"
                ariaLabel="This much percent"
            /> */}

            <Button type="submit" variant="contained">
                Submit
            </Button>
        </form>
    )
}
