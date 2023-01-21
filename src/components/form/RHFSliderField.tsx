import { Controller, Control, Path, FieldValues } from "react-hook-form"

import Slider from "@mui/material/Slider"
import FormControl from "@mui/material/FormControl"
import Typography from "@mui/material/Typography"
import FormHelperText from "@mui/material/FormHelperText"
import React from "react"

interface RHFSliderFieldProps<K extends FieldValues> {
  control: Control<K, any>;
  name: Path<K>;
  label: React.ReactNode | string;
  ariaLabel?: string;
}

export const RHFSliderField = <T extends FieldValues>(
    props: RHFSliderFieldProps<T>
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
                        <Typography gutterBottom>{label}</Typography>
                        <Slider
                            aria-label={props.ariaLabel}
                            valueLabelDisplay="auto"
                            step={10}
                            marks
                            min={0}
                            max={110}
                            onChange={onChange}
                            value={value}
                        />
                        <FormHelperText>{error ? error.message : null}</FormHelperText>
                    </FormControl>
                )
            }}
        />
    )
}
