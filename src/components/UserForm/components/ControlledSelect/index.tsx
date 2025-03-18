import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { Select, SelectProps, MenuItem, FormHelperText } from '@mui/material';

import { UserDepartment, UserPosition } from '../../../../types';

interface ControlledSelectProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<SelectProps, 'name' | 'defaultValue'> {
  options: Array<UserPosition | UserDepartment>;
  placeholderText?: string;
}

const ControlledSelect = <T extends FieldValues>({
  control,
  name,
  options,
  placeholderText = 'Выберите значение',
  ...props
}: ControlledSelectProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <>
        <Select
          {...field}
          {...props}
          displayEmpty
          error={!!error}
          sx={{ width: '500px' }}
        >
          <MenuItem disabled value="">
            {placeholderText}
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {!!error && (
          <FormHelperText sx={{ color: 'error.main' }}>
            {error.message}
          </FormHelperText>
        )}
      </>
    )}
  />
);

export default ControlledSelect;
