import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { CloseOutlined } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';

import { userStore } from '../../../../../stores/userStore';

interface Props {
  userIdToFire: null | number;
  handleFireDialogClose: () => void;
}

const FireConfirmationDialog: FC<Props> = observer(
  ({ userIdToFire, handleFireDialogClose }) => {
    const handleUserDelete = async (): Promise<void> => {
      try {
        await userStore.deleteUser(userIdToFire as number);

        handleFireDialogClose();
      } catch (error) {
        console.log('Error:', error);
      }
    };

    return (
      <Dialog open={!!userIdToFire}>
        <DialogTitle>Увольнение сотрудника</DialogTitle>
        <IconButton
          onClick={handleFireDialogClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseOutlined />
        </IconButton>
        <DialogContent>
          Это действие будет невозможно отменить. Вы действительно хотите
          уволить сотрудника? Он навсегда потеряет доступ к своей учетной
          записи, если таковая была. Все созданные им документы и сделанные
          изменения в документах сохранятся. Также карточка данного сотрудника
          будет храниться в вашей базе данных.
        </DialogContent>
        <DialogActions
          sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}
        >
          <Button
            size="large"
            variant="contained"
            data-testid="fire-user"
            onClick={handleUserDelete}
          >
            Уволить
          </Button>
          <Button
            color="secondary"
            size="large"
            variant="contained"
            onClick={handleFireDialogClose}
          >
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default FireConfirmationDialog;
