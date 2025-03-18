import {
  CalendarMonthOutlined,
  CurrencyRubleOutlined,
  Inventory2Outlined,
  MapOutlined,
  PeopleOutlined,
} from '@mui/icons-material';

import { AccordionItem } from '../../types';

export const personalAccountAccordionItems: AccordionItem[] = [
  { icon: <MapOutlined />, key: 'structure', label: 'Структура ВКК' },
  { icon: <PeopleOutlined />, key: 'organisation', label: 'Организация' },
  {
    icon: <Inventory2Outlined />,
    key: 'registry',
    label: 'Реестр документов ВКК',
  },
  {
    icon: <CalendarMonthOutlined />,
    key: 'calendar',
    label: 'Календарь ВКК',
  },
  {
    icon: <CurrencyRubleOutlined />,
    key: 'payment',
    label: 'Тарифы и оплата',
  },
];

export const workspaceAccordionItems: AccordionItem[] = [
  { key: 'supervisor', label: 'Руководитель МО' },
  { key: 'responsiblePerson', label: 'Отвественное лицо' },
  { key: 'authorizedPerson', label: 'Уполномоченное лицо' },
  { key: 'chairman', label: 'Председатель ВК' },
  { key: 'secretary', label: 'Секретарь ВК' },
  { key: 'member', label: 'Член ВК' },
  { key: 'admin', label: 'Администратор' },
];
