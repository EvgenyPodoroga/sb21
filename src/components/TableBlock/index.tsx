import { FC } from 'react';
import { Box } from '@mui/material';

// src
import { TabProps } from '../../types';
import TabsBlock from './components/TabsBlock';
import TitleBlock from './components/TitleBlock';
import UsersTable from './components/UsersTable';

const tabs: TabProps[] = [
  { label: 'Карточка организации', selected: false },
  { label: 'Обособленные подразделения', selected: false },
  { label: 'Штатное расписание', selected: true },
  { label: 'Исполнительный орган по ВККиБМД', selected: false },
  { label: 'Мониторинг', selected: false },
];

const TableBlock: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        paddingX: 5,
        paddingTop: 8,
      }}
    >
      <TabsBlock tabs={tabs} />
      <TitleBlock
        title={
          tabs.find(({ selected }) => selected)?.label ?? 'Штатное расписание'
        }
      />
      <UsersTable />
    </Box>
  );
};

export default TableBlock;
