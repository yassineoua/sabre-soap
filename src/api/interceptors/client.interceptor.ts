import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type SabreRequestConfig = AxiosRequestConfig;
export type SabreAxiosResponse = AxiosResponse;

export interface ClientInterceptor {
  handleRequest(
    request: SabreRequestConfig
  ): SabreRequestConfig | Promise<SabreRequestConfig>;

  handleResponse(
    response: SabreAxiosResponse
  ): SabreAxiosResponse | Promise<SabreAxiosResponse>;

  handleError(error: any);
}

export class AbstractInterceptor implements ClientInterceptor {
  handleRequest(
    request: SabreRequestConfig
  ): SabreRequestConfig | Promise<SabreRequestConfig> {
    return request;
  }
  handleResponse(
    response: SabreAxiosResponse
  ): SabreAxiosResponse | Promise<SabreAxiosResponse> {
    return response;
  }
  handleError(error: any) {}
}
