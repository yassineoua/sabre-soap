import { Client, createClientAsync, HttpClient } from 'soap';
import path from 'path';
import axios, { AxiosInstance } from 'axios';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import {
  MssageHeader,
  Security,
  SabreRequest,
  GenericRequestExecuter,
  SoapClientOptions,
} from './types';

export * from './types';

const HTTP_INTERCEPTORS = [new LoggingInterceptor()];

/**
 * SabreRequestExecuter
 **/
export abstract class SabreRequestExecuter<RQ extends SabreRequest<any>, RS>
  implements GenericRequestExecuter<RQ, RS>
{
  private soapClient: Client;
  private wsdl: string;
  private soapMethod: string;
  private options: SoapClientOptions;

  constructor(wsdl: string, soapMethod: string, options?: SoapClientOptions) {
    this.wsdl = wsdl;
    this.soapMethod = soapMethod;
    this.options = options || {};
  }

  private async getSoapClient(): Promise<Client> {
    const instance = axios.create();
    this._addIntereptors(instance);
    this.soapClient = await createClientAsync(
      path.resolve(__dirname, '../../wsdls', `${this.wsdl}/${this.wsdl}.wsdl`),
      {
        ...this.options,
        httpClient: new HttpClient({ request: instance }),
        attributesKey: '$attributes',
      }
    );

    this._subscribreToEvents(this.soapClient);

    return this.soapClient;
  }

  private _addIntereptors(instance: AxiosInstance) {
    for (let interceptor of HTTP_INTERCEPTORS) {
      instance.interceptors.request.use((req) =>
        interceptor.handleRequest(req)
      );
      instance.interceptors.response.use(
        (res) => interceptor.handleResponse(res),
        (error) => interceptor.handleError(error)
      );
    }
  }

  private _subscribreToEvents(client: Client) {
    for (let interceptor of HTTP_INTERCEPTORS) {
      client.on('soapError', (error) => interceptor.handleError(error));
    }
  }

  private _addMessageHeader(client: Client, messageHeader: MssageHeader) {
    client.addSoapHeader(
      { MessageHeader: messageHeader },
      'MessageHeader',
      'tns',
      'http://www.ebxml.org/namespaces/messageHeader'
    );
  }

  private _addSecurity(client: Client, security: Security) {
    client.addSoapHeader({ Security: security });
  }

  private _formatBody(client: Client, body: any) {
    return {
      _xml: client.wsdl.objectToXML(body.project(), '', '', ''),
    };
  }

  async executeRequest(req: RQ): Promise<RS> {
    try {
      const _client = await this.getSoapClient();

      this._addMessageHeader(_client, req.header);
      this._addSecurity(_client, req.security);

      const response = await _client[this.soapMethod + 'Async'](
        this._formatBody(_client, req.body)
      );
      return response;
    } catch (e) {
      return undefined;
    }
  }
}
