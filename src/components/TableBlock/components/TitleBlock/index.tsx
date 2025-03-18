import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

interface Props {
  title: string;
}

const TitleBlock: FC<Props> = ({ title }) => {
  const navigate = useNavigate();

  const handleUserNewRedirect = () => {
    navigate('/users/new');
  };

  return (
    <Box
      sx={{
        marginTop: 6,
        alignItems: 'center',
        display: 'flex',
        gap: 2,
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography sx={{ fontSize: '36px', fontWeight: 500 }}>
          {title}
        </Typography>
      </Box>
      <Box>
        <Button
          variant="contained"
          onClick={handleUserNewRedirect}
          sx={{ borderRadius: '16px', height: '60px' }}
        >
          Добавить сотрудника
        </Button>
      </Box>
    </Box>
  );
};

export default TitleBlock;
