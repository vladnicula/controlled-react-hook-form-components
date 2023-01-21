import { Controller, Control, Path, FieldValues } from "react-hook-form"

import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import FormHelperText from "@mui/material/FormHelperText"

interface RHFRadioGroupFieldProps<K extends FieldValues> {
  control: Control<K, any>;
  name: Path<K>;
  label: string;
  id: string;
  transformValue?: (value: string) => unknown;
  options: Array<{
    label: string;
    value: any;
  }>;
}

export const RHFRadioGroupField = <T extends FieldValues>(
    props: RHFRadioGroupFieldProps<T>
) => {
    const { id, name, control, label } = props
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
                        <FormLabel id={id}>{label}</FormLabel>
                        <RadioGroup
                            aria-labelledby={id}
                            name={name}
                            value={value}
                            onChange={(_e, value) => {
                                onChange(
                                    props.transformValue ? props.transformValue(value) : value
                                )
                                onChange(parseInt(value, 10))
                            }}
                        >
                            {props.options.map((option) => {
                                return (
                                    <FormControlLabel
                                        key={option.value}
                                        value={option.value}
                                        control={<Radio />}
                                        label={option.label}
                                    />
                                )
                            })}
                        </RadioGroup>
                        <FormHelperText>{error ? error.message : null}</FormHelperText>
                    </FormControl>
                )
            }}
        />
    )
}
