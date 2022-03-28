import { SabreRequest, SabreRequestExecuter } from './sabre.request';

type Request = { Output?: string; CDATA?: boolean; HostCommand?: string };

export interface SabreCommandLLSRequest
  extends SabreRequest<SabreCommandLLSRQBody> {}

export class SabreCommandLLSRQBody {
  Version?: string;
  Request?: Request;
  project() {
    return {
      SabreCommandLLSRQ: {
        $attributes: {
          Version: this.Version,
          xmlns: 'http://webservices.sabre.com/sabreXML/2003/07',
        },
        Request: {
          $attributes: {
            Output: this.Request.Output,
            CDATA: this.Request.CDATA,
          },
          HostCommand: this.Request.HostCommand,
        },
      },
    };
  }
}

export interface SabreCommandLLSRS {}

export class RunSabreCommandRequestExecuter extends SabreRequestExecuter<
  SabreCommandLLSRequest,
  SabreCommandLLSRS
> {
  constructor() {
    super('SabreCommandLLS2.0.0RQ', 'SabreCommandLLSRQ');
  }
}
