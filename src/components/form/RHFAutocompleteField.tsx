import { Controller, Control, Path, FieldValues } from "react-hook-form"

import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import Autocomplete from "@mui/material/Autocomplete"
import { ReactNode } from "react"
import Typography from "@mui/material/Typography"
import FormHelperText from "@mui/material/FormHelperText"

interface RHFAutocompleteFieldProps<
  K extends FieldValues,
  T extends { id: string; label: string }
> {
  control: Control<K, any>;
  name: Path<K>;
  placeholder?: string;
  options: Array<T>;
  id: string;
}

export const RHFAutocompleteField = <
  T extends FieldValues,
  K extends { id: string; label: string }
>(
        props: RHFAutocompleteFieldProps<T, K>
    ) => {
    const { name, control, placeholder, options } = props
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
                const valueObjectsFromFormId = value
                    ? options.find((o) => o.id === value)
                    : null

                return (
                    <FormControl fullWidth error={!!error}>
                        <Autocomplete
                            fullWidth
                            id={props.id}
                            value={valueObjectsFromFormId}
                            onChange={(_ev, value) => {
                                onChange(value?.id)
                            }}
                            options={options}
                            renderInput={(params) => (
                                <TextField {...params} label={placeholder} inputRef={ref} />
                            )}
                        />
                        <FormHelperText>{error ? error.message : null}</FormHelperText>
                    </FormControl>
                )
            }}
        />
    )
}
