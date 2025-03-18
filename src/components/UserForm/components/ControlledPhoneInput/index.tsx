import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { MuiTelInput } from 'mui-tel-input';
import { FormHelperText } from '@mui/material';

type ControlledPhoneInputProps<T extends FieldValues> = UseControllerProps<T>;

const ControlledPhoneInput = <T extends FieldValues>({
  control,
  name,
  ...props
}: ControlledPhoneInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <MuiTelInput
            {...props}
            value={field.value}
            onChange={field.onChange}
            disableDropdown
            defaultCountry="RU"
            onlyCountries={['RU']}
            placeholder="Введите номер телефона"
            size="small"
            error={!!error}
            sx={{
              width: '500px',
              '& .MuiFormHelperText-root': { marginLeft: 0 },
            }}
          />
          {!!error && (
            <FormHelperText sx={{ color: 'error.main' }}>
              {error.message}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
};

export default ControlledPhoneInput;
