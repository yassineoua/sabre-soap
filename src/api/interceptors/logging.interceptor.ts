const format = require('xml-formatter');
import { cloneStack } from '@bitauth/libauth';
import { AbstractInterceptor, SabreRequestConfig } from './client.interceptor';

export class LoggingInterceptor extends AbstractInterceptor {
  handleRequest(
    request: SabreRequestConfig
  ): SabreRequestConfig | Promise<SabreRequestConfig> {
    const requestXML = format(request.data);

    console.log(requestXML);
    return request;
  }

  handleError(error: any): void {
    console.error('--------', error.message);
  }
}
cloneStack;
