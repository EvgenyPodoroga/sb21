import { InferType } from 'yup';
import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { fromUnixTime, getUnixTime } from 'date-fns';
import { Box, Breadcrumbs, Button, Link, Typography } from '@mui/material';

import schema from './validationSchema';
import { userStore } from '../../stores/userStore';
import ControlledTextField from './components/ControlledTextField';
import ControlledSelect from './components/ControlledSelect';
import { UserPositionType } from '../../enums';
import ControlledPhoneInput from './components/ControlledPhoneInput';
import ControlledDatePicker from './components/ControlledDatePicker';

type UserFormProps = InferType<typeof schema>;

const UserForm: FC = observer(() => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { control, handleSubmit, reset } = useForm<UserFormProps>({
    defaultValues: {
      id: null,
      surname: '',
      name: '',
      patronymic: '',
      administrativePosition: '',
      medicalPosition: '',
      department: '',
      phoneNumber: '',
      email: '',
      dateOfHire: undefined,
    },
    resolver: yupResolver(schema),
  });

  const isEditMode = location.pathname.includes('/edit/');

  const handleSave = (props: UserFormProps): void => {
    const userParams = {
      name: props.name,
      surname: props.surname,
      patronymic: props.patronymic,
      email: props.email,
      phone: props.phoneNumber.replace(/\D/g, ''),
      department: props.department,
      administrative_position: props.administrativePosition,
      medical_position: props.medicalPosition,
      is_simple_digital_sign_enabled: false,
      hired_at: getUnixTime(props.dateOfHire),
    };

    if (isEditMode && props.id) {
      userStore.editUser(props.id, userParams).then(() => navigate('/'));
    } else {
      userStore.createUser(userParams).then(() => navigate('/'));
    }
  };

  useEffect(() => {
    userStore.getPositions();
    userStore.getDepartments();
  }, []);

  useEffect(() => {
    if (isEditMode && id) {
      userStore.getUser(Number(id)).then((user) => {
        if (user) {
          reset({
            id: user.id,
            surname: user.surname,
            name: user.name,
            patronymic: user.patronymic,
            // Some records have these fields as null
            administrativePosition: user.administrative_position?.value ?? '',
            medicalPosition: user.medical_position?.value ?? '',
            department: user.department?.value ?? '',
            // Plus sign is required for the component to recognize and format the number
            phoneNumber: user.phone ? `+${user.phone}` : '',
            email: user.email,
            dateOfHire: fromUnixTime(user.hired_at),
          });
        }
      });
    }
  }, [isEditMode, id, reset]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 7,
        paddingX: 5,
        paddingTop: 8,
      }}
    >
      <Box>
        <Breadcrumbs>
          <Link
            color="inherit"
            underline="hover"
            onClick={() => navigate('/')}
            sx={{ cursor: 'pointer' }}
          >
            Персоналии
          </Link>
          <Link
            color="inherit"
            underline="hover"
            onClick={() =>
              navigate(isEditMode ? `/users/edit/${id}` : '/users/new')
            }
            sx={{ cursor: 'pointer' }}
          >
            {isEditMode
              ? 'Редактирование карточки сотрудника'
              : 'Добавление нового сотрудника'}
          </Link>
        </Breadcrumbs>
      </Box>
      <Box>
        <Typography variant="h4">Основные данные сотрудника</Typography>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit(handleSave)}
        sx={{
          alignItems: 'center',
          display: 'grid',
          gridTemplateColumns: 'max-content 1fr',
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="body1">Фамилия</Typography>
        </Box>
        <Box>
          <ControlledTextField
            name="surname"
            control={control}
            disabled={userStore.isLoading}
            placeholder="Введите фамилию"
            size="small"
          />
        </Box>
        <Box>
          <Typography variant="body1">Имя</Typography>
        </Box>
        <Box>
          <ControlledTextField
            name="name"
            control={control}
            disabled={userStore.isLoading}
            placeholder="Введите имя"
            size="small"
          />
        </Box>
        <Box>
          <Typography variant="body1">Отчество</Typography>
        </Box>
        <Box>
          <ControlledTextField
            name="patronymic"
            control={control}
            disabled={userStore.isLoading}
            placeholder="Введите отчество"
            size="small"
          />
        </Box>
        <Box sx={{ maxWidth: '200px' }}>
          <Typography variant="body1">Административная должность</Typography>
        </Box>
        <Box>
          <ControlledSelect
            name="administrativePosition"
            placeholderText="Выберите должность"
            control={control}
            disabled={userStore.isLoading}
            options={userStore.positions.filter(
              (position) => position.type === UserPositionType.Administrative
            )}
            size="small"
          />
        </Box>
        <Box sx={{ maxWidth: '200px' }}>
          <Typography variant="body1">Медицинская должность</Typography>
        </Box>
        <Box>
          <ControlledSelect
            name="medicalPosition"
            placeholderText="Выберите должность"
            control={control}
            disabled={userStore.isLoading}
            options={userStore.positions.filter(
              (position) => position.type === UserPositionType.Medical
            )}
            size="small"
          />
        </Box>
        <Box sx={{ maxWidth: '200px' }}>
          <Typography variant="body1">Подразделение</Typography>
        </Box>
        <Box>
          <ControlledSelect
            name="department"
            placeholderText="Выберите подразделение"
            control={control}
            disabled={userStore.isLoading}
            options={userStore.departments}
            size="small"
          />
        </Box>
        <Box>
          <Typography variant="body1">Телефон</Typography>
        </Box>
        <Box>
          <ControlledPhoneInput
            name="phoneNumber"
            control={control}
            disabled={userStore.isLoading}
          />
        </Box>
        <Box>
          <Typography variant="body1">Email</Typography>
        </Box>
        <Box>
          <ControlledTextField
            name="email"
            control={control}
            disabled={userStore.isLoading}
            placeholder="Введите email"
            size="small"
          />
        </Box>
        <Box>
          <Typography variant="body1">Дата приема</Typography>
        </Box>
        <Box>
          <ControlledDatePicker
            name="dateOfHire"
            control={control}
            disabled={userStore.isLoading}
          />
        </Box>
        <Box sx={{ gridColumn: '1 / -1', width: '716px' }}>
          <Button
            fullWidth
            disabled={userStore.isLoading}
            type="submit"
            variant="contained"
          >
            Сохранить изменения
          </Button>
        </Box>
      </Box>
    </Box>
  );
});

export default UserForm;
