import { makeAutoObservable, flow } from 'mobx';

// src
import {
  CreateOrEditUserParams,
  GetUserDepartmentsQueryResponse,
  GetUserPositionsQueryResponse,
  UserQueryResponse,
  GetUsersQueryResponse,
  PaginationModel,
  User,
  UserDepartment,
  UserPosition,
} from '../types';
import {
  createUser,
  deleteUser,
  editUser,
  getDepartments,
  getPositions,
  getUser,
  getUsers,
} from '../api/userApi';

const createUserStore = () => {
  const store = {
    departments: [] as UserDepartment[],
    error: null as string | null,
    isLoading: false,
    totalUsers: 0,
    positions: [] as UserPosition[],
    user: null as User | null,
    users: [] as User[],

    getUsers: flow(function* (paginationModel: PaginationModel) {
      store.error = null;
      store.isLoading = true;

      try {
        const response: Response = yield getUsers(paginationModel);

        if (!response.ok) {
          store.error = `Ошибка сети: не удалось получить данные`;
          return;
        }

        const data: GetUsersQueryResponse = yield response.json();

        store.totalUsers = data.data.pagination.total;
        store.users = data.data.items;
      } catch (error) {
        if (error instanceof Error) {
          store.error = `Ошибка при получении данных: ${error.message}`;
        } else {
          store.error = 'Неизвестная ошибка при получении данных';
        }
      } finally {
        store.isLoading = false;
      }
    }),

    getUser: flow(function* (userId: number) {
      store.error = null;
      store.isLoading = true;

      try {
        const response: Response = yield getUser(userId);

        if (!response.ok) {
          store.error = `Ошибка сети: не удалось получить данные`;
          return;
        }

        const data: UserQueryResponse = yield response.json();

        store.user = data.data;

        return data.data;
      } catch (error) {
        if (error instanceof Error) {
          store.error = `Ошибка при получении данных: ${error.message}`;
        } else {
          store.error = 'Неизвестная ошибка при получении данных';
        }
      } finally {
        store.isLoading = false;
      }
    }),

    createUser: flow(function* (userParams: CreateOrEditUserParams) {
      store.error = null;
      store.isLoading = true;

      try {
        const response: Response = yield createUser(userParams);

        if (!response.ok) {
          store.error = `Ошибка сети: не удалось получить данные`;
          return;
        }
      } catch (error) {
        if (error instanceof Error) {
          store.error = `Ошибка при получении данных: ${error.message}`;
        } else {
          store.error = 'Неизвестная ошибка при получении данных';
        }
      } finally {
        store.isLoading = false;
      }
    }),

    editUser: flow(function* (
      userId: number,
      userParams: CreateOrEditUserParams
    ) {
      store.error = null;
      store.isLoading = true;

      try {
        const response: Response = yield editUser(userId, userParams);

        if (!response.ok) {
          store.error = `Ошибка сети: не удалось получить данные`;
          return;
        }

        // Check if the updated user is in the store
        const userIndex = store.users.findIndex((user) => user.id === userId);

        if (userIndex !== -1) {
          const data: UserQueryResponse = yield response.json();

          store.users[userIndex] = data.data;
        }
      } catch (error) {
        if (error instanceof Error) {
          store.error = `Ошибка при получении данных: ${error.message}`;
        } else {
          store.error = 'Неизвестная ошибка при получении данных';
        }
      } finally {
        store.isLoading = false;
      }
    }),

    deleteUser: flow(function* (userId: number) {
      store.error = null;
      store.isLoading = true;

      try {
        yield deleteUser(userId);

        store.users = store.users.filter((user) => user.id !== userId);
        store.totalUsers -= 1;
      } catch (error) {
        if (error instanceof Error) {
          store.error = `Ошибка при удалении пользователя: ${error.message}`;
        } else {
          store.error = 'Неизвестная ошибка при удалении пользователя';
        }
      } finally {
        store.isLoading = false;
      }
    }),

    getPositions: flow(function* () {
      store.error = null;
      store.isLoading = true;

      try {
        const response: Response = yield getPositions();

        if (!response.ok) {
          store.error = `Ошибка сети: не удалось получить данные`;
          return;
        }

        const data: GetUserPositionsQueryResponse = yield response.json();

        store.positions = data.data.items;
      } catch (error) {
        if (error instanceof Error) {
          store.error = `Ошибка при удалении пользователя: ${error.message}`;
        } else {
          store.error =
            'Неизвестная ошибка при получении должностей пользователь';
        }
      } finally {
        store.isLoading = false;
      }
    }),

    getDepartments: flow(function* () {
      store.error = null;
      store.isLoading = true;

      try {
        const response: Response = yield getDepartments();

        if (!response.ok) {
          store.error = `Ошибка сети: не удалось получить данные`;
          return;
        }

        const data: GetUserDepartmentsQueryResponse = yield response.json();

        store.departments = data.data.items;
      } catch (error) {
        if (error instanceof Error) {
          store.error = `Ошибка при удалении пользователя: ${error.message}`;
        } else {
          store.error =
            'Неизвестная ошибка при получении должностей пользователь';
        }
      } finally {
        store.isLoading = false;
      }
    }),

    get hasUsers() {
      return store.users.length > 0;
    },
  };

  makeAutoObservable(store);

  return store;
};

export const userStore = createUserStore();
