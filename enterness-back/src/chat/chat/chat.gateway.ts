import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', 
  },
})
export class ChatGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() message: { sender: string; message: string }): void {
    console.log('Emitindo mensagem', message)
    this.server.emit('message', message);
  }
}
