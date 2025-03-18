import { JSX } from 'react';

import { UserPositionType, UserStatus } from '../enums';

export interface TabProps {
  label: string;
  selected: boolean;
}

export interface AccordionItem {
  icon?: JSX.Element;
  key: string;
  label: string;
}

export interface ValueLabel<T = string | UserStatus> {
  value: T;
  label: string;
}

export type UserDepartment = ValueLabel;

export interface UserPosition extends UserDepartment {
  type: UserPositionType;
}

export type Nullable<T> = T | null;
export type NullableUserDepartment = Nullable<UserDepartment>;
export type NullableUserPosition = Nullable<UserPosition>;

export interface Timestamps {
  created_at: number;
  updated_at: number;
  hired_at: number;
  fired_at: number | null;
  email_verified_at: number | null;
}

export interface User extends Timestamps {
  readonly id: number;
  name: string;
  surname: string;
  patronymic: string;
  email: string;
  phone: string;
  department: NullableUserDepartment;
  status: ValueLabel<UserStatus>;
  roles: string[];
  administrative_position: NullableUserPosition;
  medical_position: NullableUserPosition;
  is_simple_digital_sign_enabled: boolean;
}

export interface QueryResponse<T> {
  message: string;
  data: {
    items: T[];
  };
}

export type GetUserPositionsQueryResponse = QueryResponse<UserPosition>;
export type GetUserDepartmentsQueryResponse = QueryResponse<ValueLabel>;

export interface Pagination {
  last_page: number;
  page: number;
  per_page: number;
  total: number;
}

export interface PaginatedResponse<T> {
  data: {
    items: T[];
    pagination: Pagination;
  };
  message: string;
}

export type GetUsersQueryResponse = PaginatedResponse<User>;

export interface UserQueryResponse {
  data: User;
  message: string;
}

export interface CreateOrEditUserParams
  extends Pick<
    User,
    | 'name'
    | 'surname'
    | 'patronymic'
    | 'email'
    | 'phone'
    | 'is_simple_digital_sign_enabled'
  > {
  department: string;
  administrative_position: string;
  medical_position: string;
  hired_at: number;
}

export interface PaginationModel {
  page: number;
  pageSize: number;
}
