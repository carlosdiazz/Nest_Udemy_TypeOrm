import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

//PROPIO+
import { MessagesWsService } from './messages-ws.service';
import { NewMessageDto } from './dto/new_message.dto';
import { JwtPayload } from '../auth/interface/jwt_payload.interface';

//namespace: '/products'
@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService,
  ) {}
  async handleConnection(client: Socket, ...args: any[]) {
    const token = client.handshake.headers.authentication as string;
    //console.log({ token });
    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify(token);
      await this.messagesWsService.registerClient(client, payload.id);
    } catch (error) {
      client.disconnect();
      //throw new WsException('TOken invalid');
      return;
    }
    console.log({ payload });
    //this.messagesWsService.registerClient(client, payload.id);
    //console.log(
    //  `Clientes conectados ${this.messagesWsService.getConnectedClients()}`,
    //);
    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );

    //Aqui uno al cliente que entre a la una sala perzonalizada
    client.join('ventas');

    this.wss.to('ventas').emit('SALA DE VENTAS');
  }

  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id);
    //console.log(
    //  `Clientes conectados ${this.messagesWsService.getConnectedClients()}`,
    //);
    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  @SubscribeMessage('message-from-client')
  onMessageFromClient(client: Socket, payload: NewMessageDto) {
    //?Emite unicamente al cliente
    //! client.emit('message-from-server', {
    //!   fullName: 'Soy Serve',
    //!   message: payload.message || 'no-message',
    //! });

    //? Emitir a todos menos al cliente inicial
    //! client.broadcast.emit('message-from-server', {
    //!   fullName: 'Soy Serve',
    //!   message: payload.message || 'no-message',
    //! });

    this.wss.emit('message-from-server', {
      fullName: this.messagesWsService.getUserFullName(client.id),
      message: payload.message || 'no-message',
    });
  }
}
