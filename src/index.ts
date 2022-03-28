import {
  RunSabreCommandRequestExecuter,
  SabreCommandLLSRequest,
  SabreCommandLLSRQBody,
} from './api/run-sabre-command.request';

async function run() {
  const header = {
    Action: 'SabreCommandLLSRQ',
    From: { PartyId: '99999' },
    To: { PartyId: '123123' },
    ConversationId: 'Orchestration',
    CPAId: 'B6',
    Service: 'RunSabreCommand',
    MessageData: {
      MessageId: '92ef6406-5de6-451a-a1cc-448285b0b67bJB Framework',
      Timestamp: '2009-10-14T16:00:14Z',
    },
  };

  const body = new SabreCommandLLSRQBody();
  body.Version = '2003A.TsabreXML1.6.1';
  body.Request = { CDATA: true, Output: 'SCREEN', HostCommand: 'AA' };

  const request: SabreCommandLLSRequest = {
    header: header,
    security: { BinarySecurityToken: '{{BT}}' },
    body: body,
  };
  const executer = new RunSabreCommandRequestExecuter();

  executer.executeRequest(request);
}

run();
