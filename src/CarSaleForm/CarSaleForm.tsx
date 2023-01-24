import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import Button from "@mui/material/Button"
import { RHFTextField } from "../components/form/RHFTextField"
import { RHFCheckboxField } from "../components/form/RHFCheckboxField"
// import { RHFSliderField } from "../components/form/RHFSliderField"
import { RHFAutocompleteField } from "../components/form/RHFAutocompleteField"
import { RHFDatePicker } from "../components/form/RHFDatepickerField"
import { Box, Link } from "@mui/material"
import { ReactNode } from "react"

const MUIFormSchema = z.object({
    price: z.number({
        invalid_type_error: "You must provide a positive number"
    }).min(2, "Value must be at least $10"),
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
    newsletterOptIn: z.boolean().optional(),
    carMake: z.string(),
    carModel: z.string()
})

export type CarSaleFormValues = z.infer<typeof MUIFormSchema>;

interface MUIComponentsFormProps {
    header?: ReactNode
    onSubmitReady: (data: CarSaleFormValues) => unknown | Promise<unknown>
    values?: CarSaleFormValues
    locked?: boolean
}

export const CarSaleForm = (props: MUIComponentsFormProps) => {
    const { control, handleSubmit, formState: {isSubmitting} } = useForm<CarSaleFormValues>({
        resolver: zodResolver(MUIFormSchema),
        values: props.values,
        defaultValues: {
            agreeToS: false,
            newsletterOptIn: true
        }
    })

    const isLocked = props.locked || isSubmitting

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
            {/* https://github.com/react-hook-form/react-hook-form/discussions/3024 */}
            <fieldset 
                style={{
                    border: 'none', 
                    display: "flex",
                    flexFlow: "column",
                    alignItems: "start",
                    gap: 20,
                    opacity: isLocked ? 0.5 : 1
                }}
                disabled={isLocked}
            >
                <RHFTextField
                    name="price"
                    control={control}
                    label="Asking Price"
                    parseOutput={(value) => {
                        const numericValue = parseInt(value, 10)
                        return isNaN(numericValue) ? value : numericValue
                    }}
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
                            label: "Audi"
                        },
                        {
                            id: "2",
                            label: "BMW"
                        },
                        {
                            id: "3",
                            label: "Volvo"
                        },
                        {
                            id: "4",
                            label: "Toyota"
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
                            label: "Corolla"
                        },
                        {
                            id: "2",
                            label: "Prius"
                        },
                        {
                            id: "3",
                            label: "RAV4"
                        },
                        {
                            id: "4",
                            label: "Mirai"
                        }
                    ]}
                />

                <Box>
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
                </Box>

                {/* <RHFSliderField
                name="slider"
                control={control}
                label="Are you willing to give"
                ariaLabel="This much percent"
            /> */}
            </fieldset>

            <Button disabled={isLocked} type="submit" variant="contained">
                Submit
            </Button>
        </form>
    )
}
