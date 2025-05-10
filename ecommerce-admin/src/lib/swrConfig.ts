import useSWR, { SWRConfiguration } from 'swr';
import axios from '../api/axios';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface ApiResponse {
  user?: User;
}

const fetcher = async (url: string): Promise<ApiResponse> => {
  const res = await axios.get(url, { withCredentials: true });
  return res.data;
};

export const useAuthSWR = (key: string, options?: SWRConfiguration) => {
  return useSWR<ApiResponse>(key, fetcher, {
    dedupingInterval: 60000,
    revalidateOnFocus: true,
    revalidateIfStale: true,
    revalidateOnReconnect: true,
    shouldRetryOnError: false,
    ...options,
  });
};
