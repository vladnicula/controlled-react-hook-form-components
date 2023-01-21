import { Controller, Control, Path, FieldValues } from "react-hook-form"

import { ReactNode } from "react"

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { FormControl, FormControlLabel, FormHelperText, TextField } from "@mui/material"

interface RHFDatePickerProps<K extends FieldValues> {
  control: Control<K, any>;
  name: Path<K>;
  id: string;
  label: ReactNode | string;
}

export const RHFDatePicker = <T extends FieldValues>(
    props: RHFDatePickerProps<T>
) => {
    const { name, control, label } = props

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, onBlur, value, ref },
                fieldState: { error }
            }) => {
                return (
                    <FormControl fullWidth error={!!error}>
                        <DatePicker
                            customInput={(
                                <TextField
                                    fullWidth
                                    label={label}
                                    onBlur={onBlur}
                                    inputRef={ref}
                                />
                            )}
                            onBlur={onBlur}
                            selected={value ? new Date(value) : null}
                            onChange={(date) => (date ? onChange(date.getTime()) : null)}
                        />
                        <FormHelperText>{error ? error.message : null}</FormHelperText>
                    </FormControl>
                )
            }}
        />
    )
}
