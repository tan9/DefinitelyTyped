interface Client {
  heartbeat: any;

  debug(...args: string[]);

  connect(...args: any[]);
  disconnect(disconnectCallback: () => any, headers?: any);

  send(destination: string, headers?: any, body?: string);
  subscribe(destination: string, callback?: (message: Message) => any, body?: string);
  unsubscribe();

  begin(transaction: string);
  commit(transaction: string);
  abort(transaction: string);

  ack(messageID: string, subscription: string, headers?: any);
  nack(messageID: string, subscription: string, headers?: any);
}

interface Message {
  command: string;
  headers: any;
  body: string;

  ack(headers?: any);
  nack(headers?: any);
}

interface Frame {
  constructor(command: string, headers?: any, body?: string);

  toString(): string;
  sizeOfUTF8(s: string);
  unmarshall(datas: any);
  marshall(command: string, headers?, body?);
}

interface Stomp {
  client: Client;
  Frame: Frame;

  over(ws: WebSocket);
}

declare var Stomp: Stomp;

declare module "stompjs" {
  export = Stomp;
}

