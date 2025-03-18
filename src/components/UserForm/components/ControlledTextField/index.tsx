import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

interface ControlledTextFieldProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<TextFieldProps, 'name' | 'defaultValue'> {}

const ControlledTextField = <T extends FieldValues>({
  control,
  name,
  ...props
}: ControlledTextFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <TextField
        {...field}
        {...props}
        error={!!error}
        helperText={error?.message}
        sx={{ width: '500px', '& .MuiFormHelperText-root': { marginLeft: 0 } }}
      />
    )}
  />
);

export default ControlledTextField;
