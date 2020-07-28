export interface AppResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  error?: string;
  errorData?: {};
  errorCode?: number;
}
