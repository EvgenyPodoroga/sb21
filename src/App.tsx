import {
  Routes,
  Route,
  useLocation,
  RouteProps,
  matchPath,
} from 'react-router-dom';
import { FC } from 'react';
import { Box, CssBaseline, IconButton, Theme } from '@mui/material';
import { grey } from '@mui/material/colors';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';

// src
import Sidebar from './components/Sidebar';
import TableBlock from './components/TableBlock';
import UserForm from './components/UserForm';
import Header from './components/Header';
import NotFound from './components/NotFound';

const validRoutes: RouteProps[] = [
  { path: '/', element: <TableBlock /> },
  { path: '/users/new', element: <UserForm /> },
  { path: '/users/edit/:id', element: <UserForm /> },
];

const App: FC = () => {
  const location = useLocation();

  const isValidRoute = validRoutes.some((route) =>
    matchPath(route.path as string, location.pathname)
  );

  return (
    <Box display="flex">
      <CssBaseline />
      {isValidRoute && (
        <>
          <Sidebar />
          <IconButton
            sx={(theme: Theme) => ({
              backgroundColor: grey[50],
              border: `solid 1px ${theme.palette.divider}`,
              borderRadius: '8px',
              left: 319,
              position: 'fixed',
              top: 83,
              // MUI's Drawer component has zIndex value of 1200. This makes sure that the button is rendered on top of it
              zIndex: 1201,
              '&:active': { backgroundColor: grey[50] },
              '&:focus': { backgroundColor: grey[50] },
              '&:hover': { backgroundColor: grey[50] },
            })}
          >
            <KeyboardDoubleArrowLeftOutlinedIcon />
          </IconButton>
        </>
      )}
      <Box
        sx={{
          alignItems: isValidRoute ? 'stretch' : 'center',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          justifyContent: isValidRoute ? 'stretch' : 'center',
          width: '100%',
        }}
      >
        {isValidRoute && <Header />}
        <Routes>
          {validRoutes.map((route) => (
            <Route {...route} key={route.path} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
