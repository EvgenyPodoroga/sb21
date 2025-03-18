import { FC } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { grey } from '@mui/material/colors';

import { TabProps } from '../../../../types';

interface Props {
  tabs: TabProps[];
}

const TabsBlock: FC<Props> = ({ tabs }) => {
  return (
    <Box>
      <Tabs
        value={tabs.findIndex(({ selected }) => selected)}
        sx={{
          backgroundColor: grey[100],
          borderRadius: '12px',
          display: 'inline-flex',
          '&.MuiTabs-list': {},
          '& .MuiTabs-indicator': {
            display: 'none',
          },
        }}
      >
        {tabs.map(({ label, selected }) => (
          <Tab
            label={label}
            key={label}
            sx={{
              marginY: 0.5,
              padding: 2,
              textTransform: 'none',
              // Inactive tab styles
              '&.MuiTab-root': selected
                ? {}
                : { borderRadius: '8px', color: grey[500] },
              // Active tab styles
              '&.Mui-selected': selected
                ? {
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    color: 'black',
                  }
                : {},
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default TabsBlock;
