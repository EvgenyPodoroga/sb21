import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { userStore } from '../../../../stores/userStore';
import UsersTable from '.';
import { UserStatus } from '../../../../enums';
import { User } from '../../../../types';
import { userStatusLabel } from '../../../../constants';

const mockUsers = vi.hoisted(
  () =>
    Array.from({ length: 1 }, (_, index) => ({
      id: index + 1,
      created_at: 1740746814,
      updated_at: 1740746814,
      hired_at: 1736149184,
      fired_at: null,
      email_verified_at: null,
      name: `Пользователь ${index + 1}`,
      surname: 'Пользователев',
      patronymic: 'Пользователевич',
      email: `user${index + 1}@example.com`,
      phone: '12345',
      department: {
        value: 'therapy',
        label: 'Терапия',
      },
      status: {
        value: 'active',
        label: 'Активен',
      },
      roles: [],
      administrative_position: {
        value: 'manager',
        type: 'administrative',
        label: 'Менеджер',
      },
      medical_position: {
        value: 'dentist',
        type: 'medical',
        label: 'Стоматолог',
      },
      is_simple_digital_sign_enabled: false,
    })) as User[]
);

const mockNavigate = vi.fn();

vi.mock('../../../../stores/userStore', () => ({
  userStore: {
    deleteUser: vi.fn((userId: number) => {
      userStore.users = userStore.users.filter((user) => user.id !== userId);
    }),
    error: null,
    getUsers: vi.fn().mockResolvedValue({}),
    isLoading: false,
    totalUsers: mockUsers.length,
    users: mockUsers,
  },
}));

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('users table', () => {
  beforeEach(() => {
    userStore.users = mockUsers;
    userStore.totalUsers = mockUsers.length;
    userStore.error = null;
    userStore.isLoading = false;
    userStore.getUsers = vi.fn().mockResolvedValue({});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('calls getUsers on mount with the initial pagination model', async () => {
    render(<UsersTable />);

    await waitFor(() => {
      expect(userStore.getUsers).toHaveBeenCalledWith({
        page: 0,
        pageSize: 5,
      });
    });
  });

  it('renders DataGrid with users', async () => {
    render(<UsersTable />);

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      // 1 row with column header and 1 row with data
      expect(rows).toHaveLength(2);
      expect(
        screen.getByText(/пользователев пользователь 1 пользователевич/i)
      ).toBeInTheDocument();
    });
  });

  it('displays no results message if there is no results', async () => {
    userStore.users = [];

    render(<UsersTable />);

    await waitFor(() => {
      expect(screen.getByText('Нет результатов')).toBeInTheDocument();
    });
  });

  it('displays an error message if an error occurs while getting users', async () => {
    userStore.users = [];
    userStore.error = 'Не удалось получить пользователей';

    render(<UsersTable />);

    await waitFor(() => {
      expect(
        screen.getByText('Не удалось получить пользователей')
      ).toBeInTheDocument();
    });
  });

  it('fires the user when the fire button is clicked', async () => {
    render(<UsersTable />);

    const fireButton = screen.getAllByRole('button', { name: /уволить/i })[0];
    await userEvent.click(fireButton);

    const confirmButton = screen.getByTestId('fire-user');
    await userEvent.click(confirmButton);

    await waitFor(() => {
      expect(userStore.deleteUser).toHaveBeenCalledWith(1);
      expect(userStore.users).toHaveLength(0);
      expect(userStore.users.some((user) => user.id === 1)).toBe(false);
    });
  });

  it('navigates to the edit page when the edit button is clicked', async () => {
    render(<UsersTable />);

    const editButton = screen.getAllByTestId('edit-user')[0];
    await userEvent.click(editButton);

    expect(mockNavigate).toHaveBeenCalledWith('/users/edit/1');
  });

  describe('pagination', () => {
    it('changes amount of users visible on the page', async () => {
      render(<UsersTable />);

      await userEvent.click(
        screen.getByLabelText(/количество пользователей на странице/i)
      );
      await userEvent.click(screen.getByRole('option', { name: /10/i }));

      await waitFor(() => {
        expect(userStore.getUsers).toHaveBeenCalledWith({
          page: 0,
          pageSize: 10,
        });
      });
    });

    it('navigates to the next page when the next page button is clicked', async () => {
      userStore.users = Array.from({ length: 20 }, (_, index) => ({
        id: index + 1,
        created_at: 1740746814,
        updated_at: 1740746814,
        hired_at: 1736149184,
        fired_at: null,
        email_verified_at: null,
        name: `Пользователь ${index + 1}`,
        surname: 'Пользователев',
        patronymic: 'Пользователевич',
        email: `user${index + 1}@example.com`,
        phone: '12345',
        department: null,
        status: {
          value: UserStatus.Active,
          label: userStatusLabel[UserStatus.Active],
        },
        roles: [],
        administrative_position: null,
        medical_position: null,
        is_simple_digital_sign_enabled: false,
      }));
      userStore.totalUsers = 20;

      render(<UsersTable />);

      await waitFor(() => {
        expect(userStore.getUsers).toHaveBeenCalledWith({
          page: 0,
          pageSize: 5,
        });
      });

      await userEvent.click(screen.getByTitle(/go to next page/i));

      await waitFor(() => {
        expect(userStore.getUsers).toHaveBeenCalledWith({
          page: 1,
          pageSize: 5,
        });
      });
    });

    it('navigates to the previous page when the previous page button is clicked', async () => {
      userStore.users = Array.from({ length: 20 }, (_, index) => ({
        id: index + 1,
        created_at: 1740746814,
        updated_at: 1740746814,
        hired_at: 1736149184,
        fired_at: null,
        email_verified_at: null,
        name: `Пользователь ${index + 1}`,
        surname: 'Пользователев',
        patronymic: 'Пользователевич',
        email: `user${index + 1}@example.com`,
        phone: '12345',
        department: null,
        status: {
          value: UserStatus.Active,
          label: userStatusLabel[UserStatus.Active],
        },
        roles: [],
        administrative_position: null,
        medical_position: null,
        is_simple_digital_sign_enabled: false,
      }));
      userStore.totalUsers = 20;

      render(<UsersTable />);

      await waitFor(() => {
        expect(userStore.getUsers).toHaveBeenCalledWith({
          page: 0,
          pageSize: 5,
        });
      });

      await userEvent.click(screen.getByTitle(/go to next page/i));
      await userEvent.click(screen.getByTitle(/go to previous page/i));

      await waitFor(() => {
        expect(userStore.getUsers).toHaveBeenCalledWith({
          page: 0,
          pageSize: 5,
        });
      });
    });
  });
});
