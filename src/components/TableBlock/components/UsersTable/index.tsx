import { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Tooltip } from 'react-tooltip';

// src
import { PaginationModel } from '../../../../types';
import getUsersTableColumns from './usersTableColumns';
import { userStore } from '../../../../stores/userStore';
import FireConfirmationDialog from './FireConfirmationDialog';

const UsersTable: FC = observer(() => {
  const navigate = useNavigate();

  const [userIdToFire, setUserIdToFire] = useState<null | number>(null);
  const [paginationModel, setPaginationModel] = useState<PaginationModel>({
    page: 0,
    pageSize: 5,
  });

  const handleUserEditRedirect = (userId: number): void => {
    navigate(`/users/edit/${userId}`);
  };

  const handleFireConfirmationDialogOpen = (userId: number) => {
    setUserIdToFire(userId);
  };

  const handleFireConfirmationDialogClose = () => {
    setUserIdToFire(null);
  };

  const columns = getUsersTableColumns(
    handleUserEditRedirect,
    handleFireConfirmationDialogOpen
  );

  useEffect(() => {
    userStore.getUsers(paginationModel);
  }, [paginationModel]);

  return (
    <>
      <Box marginTop={3}>
        <Paper>
          <DataGrid
            checkboxSelection
            disableRowSelectionOnClick
            pagination
            paginationMode="server"
            pageSizeOptions={[5, 10, 15]}
            columns={columns}
            loading={userStore.isLoading}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            rows={userStore.users}
            rowCount={userStore.totalUsers}
            localeText={{
              noResultsOverlayLabel: userStore.error
                ? userStore.error
                : 'Нет результатов',
            }}
            slotProps={{
              pagination: {
                labelRowsPerPage: 'Количество пользователей на странице',
              },
            }}
          />
        </Paper>
        <Tooltip id="nameTooltip" />
      </Box>
      <FireConfirmationDialog
        userIdToFire={userIdToFire}
        handleFireDialogClose={handleFireConfirmationDialogClose}
      />
    </>
  );
});

export default UsersTable;
