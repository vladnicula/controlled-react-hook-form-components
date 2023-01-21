import { Controller, Control, Path, FieldValues } from "react-hook-form"

import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import Checkbox from "@mui/material/Checkbox"
import FormHelperText from "@mui/material/FormHelperText"
import React from "react"

interface RHFCheckboxFieldProps<K extends FieldValues> {
  control: Control<K, any>;
  name: Path<K>;
  id: string;
  label: React.ReactNode | string;
}

export const RHFCheckboxField = <T extends FieldValues>(
    props: RHFCheckboxFieldProps<T>
) => {
    const { name, control, label, id } = props
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
                        <FormControlLabel
                            control={<Checkbox id={id} checked={value} onChange={onChange} />}
                            label={label}
                        />
                        <FormHelperText>{error ? error.message : null}</FormHelperText>
                    </FormControl>
                )
            }}
        />
    )
}
