import { FC } from 'react';
import {
  Drawer,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from '@mui/material';
import { ExpandMoreOutlined, StarBorderOutlined } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

import SbLogo from '../../assets/icons/SbLogo';
import {
  personalAccountAccordionItems,
  workspaceAccordionItems,
} from './accordionItems';

const Sidebar: FC = () => {
  return (
    <Drawer
      open
      anchor="left"
      variant="persistent"
      sx={{
        width: '340px',
        '& .MuiDrawer-paper': { width: '340px' },
      }}
    >
      <Box
        sx={{
          backgroundColor: grey[100],
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: 5,
        }}
      >
        <Box>
          <Box sx={{ alignItems: 'center', display: 'flex', gap: 2 }}>
            <Box>
              <SbLogo color="primary" sx={{ width: '70px', height: '70px' }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box>
                <Typography
                  sx={{ fontSize: '48px', fontWeight: 800, lineHeight: '48px' }}
                >
                  СБ21
                </Typography>
              </Box>
              <Box>
                <Typography color="primary">Секретарь ВКК</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Accordion
              expanded
              sx={{ backgroundColor: grey[100], boxShadow: 'none' }}
            >
              <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
                <Typography>Личный кабинет</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {personalAccountAccordionItems.map(({ icon, key, label }) => (
                  <Button
                    fullWidth
                    color="inherit"
                    startIcon={icon}
                    key={key}
                    sx={{
                      backgroundColor:
                        key === 'organisation' ? 'white' : 'inherit',
                      borderRadius: '16px',
                      justifyContent: 'flex-start',
                      padding: 2,
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box sx={{ marginTop: 3 }}>
            <Accordion
              expanded
              sx={{ backgroundColor: grey[100], boxShadow: 'none' }}
            >
              <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
                <Typography>Рабочее пространство</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {workspaceAccordionItems.map(({ key, label }) => (
                  <Button
                    fullWidth
                    color="inherit"
                    startIcon={<StarBorderOutlined />}
                    key={key}
                    sx={{
                      borderRadius: '16px',
                      justifyContent: 'flex-start',
                      padding: 2,
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', height: '100%', alignItems: 'flex-end' }}>
          <Button
            fullWidth
            color="inherit"
            startIcon={<StarBorderOutlined />}
            sx={{
              borderRadius: '16px',
              justifyContent: 'flex-start',
              padding: 2,
            }}
          >
            О сервисе
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
