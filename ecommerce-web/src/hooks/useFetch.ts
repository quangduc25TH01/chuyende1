// hooks/useFetch.ts
import useSWR from "swr";
import config from "@/config";

export const fetcher = async (url: string) => {
  const res = await fetch(`${config.apiServerUrl}/api/${url}`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};

/**
 * Custom hook dùng useSWR để fetch dữ liệu
 * @param {string} url - Đường dẫn API cần fetch
 * @param {object} options - Cấu hình useSWR (tuỳ chọn)
 */
export function useFetch<T>(url: string, options?: any) {
  const { data, error, isLoading, mutate } = useSWR<T>(url, fetcher, options);

  return {
    data: (data as T) || [],
    error,
    isLoading,
    mutate, // Dùng để cập nhật dữ liệu thủ công mà không gọi API lại
  };
}
