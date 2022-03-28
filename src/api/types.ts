import { IOptions } from 'soap';

/**
 * MessageHeader
 */
export interface MssageHeader {
  Action?: string;
  From?: From;
  To?: To;
  CPAId?: string;
  ConversationId?: string;
  Service?: string;
  MessageData?: MessageData;
}
export interface From {
  PartyId?: string;
}

export interface To {
  PartyId?: string;
}

export interface MessageData {
  MessageId?: string;
  Timestamp?: string;
}

/**
 * Security
 */
export type BinarySecurityToken = string;

export interface Security {
  BinarySecurityToken: BinarySecurityToken;
}

/**
 * GenericRequestExecuter
 **/

export interface SabreRequest<TBody> {
  header?: MssageHeader;
  security?: Security;
  body?: TBody;
}

export interface GenericRequestExecuter<
  RQ extends SabreRequest<{ toXML: () => string }>,
  RS
> {
  executeRequest(req: RQ): Promise<RS>;
}

export type SoapClientOptions = IOptions;
