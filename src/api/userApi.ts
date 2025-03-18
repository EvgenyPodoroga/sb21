import ky, { KyResponse } from 'ky';

// src
import { CreateOrEditUserParams, PaginationModel } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getUsers = async (
  paginationModel: PaginationModel
): Promise<KyResponse> => {
  return await ky.get(`${API_BASE_URL}/users`, {
    searchParams: {
      page: paginationModel.page + 1,
      per_page: paginationModel.pageSize,
    },
  });
};

export const getUser = async (userId: number): Promise<KyResponse> => {
  return await ky.get(`${API_BASE_URL}/users/${userId}`);
};

export const createUser = async (
  userParams: CreateOrEditUserParams
): Promise<KyResponse> => {
  return await ky.post(`${API_BASE_URL}/users`, {
    json: userParams,
  });
};

export const editUser = async (
  userId: number,
  userParams: CreateOrEditUserParams
): Promise<KyResponse> => {
  return await ky.put(`${API_BASE_URL}/users/${userId}`, { json: userParams });
};

export const deleteUser = async (userId: number): Promise<KyResponse> => {
  return await ky.delete(`${API_BASE_URL}/users/${userId}`);
};

export const getPositions = async (): Promise<KyResponse> => {
  return await ky.get(`${API_BASE_URL}/positions`);
};

export const getDepartments = async (): Promise<KyResponse> => {
  return await ky.get(`${API_BASE_URL}/departments`);
};
