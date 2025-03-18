import { GridColDef } from '@mui/x-data-grid';
import { Box, Button, Checkbox, IconButton } from '@mui/material';
import parsePhoneNumberFromString from 'libphonenumber-js';
import { EditOutlined } from '@mui/icons-material';
import { format, fromUnixTime } from 'date-fns';

// src
import { userStatusLabel } from '../../../../constants';
import { UserStatus } from '../../../../enums';

const getUsersTableColumns = (
  navigateToUserEdit: (userId: number) => void,
  toggleFireConfirmationDialog: (userId: number) => void
): GridColDef[] => [
  {
    field: 'name',
    headerName: 'ФИО',
    disableColumnMenu: true,
    flex: 1,
    renderCell: (params) => {
      const fullName = [
        params.row.surname,
        params.row.name,
        params.row.patronymic,
      ].join(' ');

      return (
        <Box data-tooltip-id="nameTooltip" data-tooltip-content={fullName}>
          {fullName}
        </Box>
      );
    },
  },
  {
    field: 'phone',
    headerName: 'Телефон',
    disableColumnMenu: true,
    flex: 1,
    renderCell: (params) => {
      const phoneNumber: string | null = params.row.phone;

      return phoneNumber
        ? parsePhoneNumberFromString(phoneNumber, 'RU')?.formatInternational()
        : null;
    },
  },
  { field: 'email', headerName: 'Почта', disableColumnMenu: true, flex: 1 },
  {
    field: 'department',
    headerName: 'Отдел',
    disableColumnMenu: true,
    flex: 1,
    renderCell: (params) => params.row.department?.label,
  },
  {
    field: 'administrativePosition',
    headerName: 'Административная должность',
    disableColumnMenu: true,
    flex: 1,
    renderCell: (params) => params.row.administrative_position?.label,
  },
  {
    field: 'medicalPosition',
    headerName: 'Медицинская должность',
    disableColumnMenu: true,
    flex: 1,
    renderCell: (params) => params.row.medical_position?.label,
  },
  {
    field: 'accountStatus',
    headerName: 'Статус УЗ',
    disableColumnMenu: true,
    flex: 1,
    renderCell: (params) =>
      userStatusLabel[params.row.status.value as UserStatus],
  },
  {
    field: 'isSimpleDigitalSignEnabled',
    headerName: 'ПЭП',
    disableColumnMenu: true,
    renderCell: (params) => (
      <Checkbox disabled checked={params.row.is_simple_digital_sign_enabled} />
    ),
  },
  {
    field: 'createdAt',
    headerName: 'Дата создания',
    disableColumnMenu: true,
    flex: 1,
    renderCell: (params) =>
      format(fromUnixTime(params.row.created_at), 'dd.MM.yyyy'),
  },
  {
    field: 'updatedAt',
    headerName: 'Дата последнего обновления',
    disableColumnMenu: true,
    flex: 1,
    renderCell: (params) =>
      format(fromUnixTime(params.row.updated_at), 'dd.MM.yyyy'),
  },
  {
    field: 'hiredAt',
    headerName: 'Дата принятия на работу',
    disableColumnMenu: true,
    flex: 1,
    renderCell: (params) =>
      format(fromUnixTime(params.row.hired_at), 'dd.MM.yyyy'),
  },
  {
    field: 'firedAt',
    headerName: 'Дата увольнения',
    disableColumnMenu: true,
    flex: 1,
    renderCell: (params) =>
      params.row.fired_at
        ? format(fromUnixTime(params.row.fired_at), 'dd.MM.yyyy')
        : null,
  },
  {
    field: 'emailVerifiedAt',
    headerName: 'Дата подтверждения почты',
    disableColumnMenu: true,
    flex: 1,
    renderCell: (params) =>
      params.row.email_verified_at
        ? format(fromUnixTime(params.row.email_verified_at), 'dd.MM.yyyy')
        : null,
  },
  {
    field: 'fire',
    headerName: '',
    disableColumnMenu: true,
    flex: 1,
    renderCell: (params) => (
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Button
          variant="contained"
          disabled={!!params.row.fired_at}
          onClick={() => toggleFireConfirmationDialog(params.row.id)}
          sx={{ borderRadius: '16px' }}
        >
          Уволить
        </Button>
      </Box>
    ),
  },
  {
    field: 'edit',
    headerName: '',
    disableColumnMenu: true,
    flex: 1,
    renderCell: (params) => (
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <IconButton
          data-testid="edit-user"
          onClick={() => navigateToUserEdit(params.row.id)}
        >
          <EditOutlined />
        </IconButton>
      </Box>
    ),
  },
];

export default getUsersTableColumns;
