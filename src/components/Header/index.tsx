import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box,
  Chip,
  Divider,
  IconButton,
  MenuItem,
  Select,
  Theme,
} from '@mui/material';
import {
  EmailOutlined,
  NotificationsOutlined,
  PersonOutlined,
} from '@mui/icons-material';
import { purple } from '@mui/material/colors';

import { userStore } from '../../stores/userStore';

const Header: FC = observer(() => {
  useEffect(() => {
    userStore.getDepartments();
  }, []);

  return (
    <Box
      sx={(theme: Theme) => ({
        borderBottom: `solid 1px ${theme.palette.divider}`,
        display: 'flex',
        justifyContent: 'space-between',
        paddingX: 5,
        paddingY: 3,
      })}
    >
      <Box>
        <Select
          displayEmpty
          value=""
          disabled={userStore.isLoading}
          sx={{ width: '260px' }}
        >
          <MenuItem disabled value="">
            Выберите подразделение
          </MenuItem>
          {userStore.departments.map(({ value, label }) => (
            <MenuItem disabled={userStore.isLoading} key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box sx={{ alignItems: 'center', display: 'flex', gap: 2 }}>
        <Box>
          <IconButton disabled={userStore.isLoading}>
            <NotificationsOutlined />
          </IconButton>
        </Box>
        <Box>
          <IconButton disabled={userStore.isLoading}>
            <EmailOutlined />
          </IconButton>
        </Box>
        <Divider orientation="vertical" />
        <Box>
          <Chip
            label="Руководитель МО"
            sx={{ backgroundColor: purple[100], color: purple[500] }}
          />
        </Box>
        <Box>
          <IconButton disabled={userStore.isLoading}>
            <PersonOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
});

export default Header;
