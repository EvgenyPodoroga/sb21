import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { TextField } from '@mui/material';
import { ru } from 'date-fns/locale';

type ControlledDatePickerProps<T extends FieldValues> = UseControllerProps<T>;

const ControlledDatePicker = <T extends FieldValues>({
  control,
  name,
  ...props
}: ControlledDatePickerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          selected={field.value}
          onChange={field.onChange}
          locale={ru}
          placeholderText="Выберите дату"
          dateFormat="dd.MM.yyyy"
          customInput={
            <TextField
              fullWidth
              size="small"
              error={!!error}
              helperText={error?.message}
              sx={{
                width: '500px',
                '& .MuiFormHelperText-root': { marginLeft: 0 },
              }}
            />
          }
          {...props}
        />
      )}
    />
  );
};

export default ControlledDatePicker;
