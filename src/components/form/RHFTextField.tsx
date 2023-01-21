import { Controller, Control, Path, FieldValues } from "react-hook-form"

import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import TextField, { TextFieldProps } from "@mui/material/TextField"
import FormHelperText from "@mui/material/FormHelperText"

interface RHFTextFieldProps<K extends FieldValues> {
  control: Control<K, any>;
  name: Path<K>;
  label: string;
  transformValue?: (value: string) => unknown;
  inputComponentProps?: TextFieldProps['InputProps']
}

export const RHFTextField = <T extends FieldValues>(
    props: RHFTextFieldProps<T>
) => {
    const { name, control: contorl, label } = props
    return (
        <Controller
            name={name}
            control={contorl}
            render={({
                field: { onChange, onBlur, value, ref },
                fieldState: { error }
            }) => {
                return (
                    <FormControl fullWidth error={!!error}>
                        <TextField
                            InputProps={props.inputComponentProps}
                            label={label}
                            //lets make it focusable
                            onChange={(ev) => {
                                const eventValue = ev.target.value
                                if (eventValue === "") {
                                    return onChange(null)
                                }
                                onChange(
                                    props.transformValue
                                        ? props.transformValue(eventValue)
                                        : eventValue
                                )
                            }}
                            value={value === undefined || value === null ? "" : value}
                            onBlur={onBlur}
                            // makes it focusable
                            inputRef={ref}
                        />
                        <FormHelperText>{error ? error.message : null}</FormHelperText>
                    </FormControl>
                )
            }}
        />
    )
}
