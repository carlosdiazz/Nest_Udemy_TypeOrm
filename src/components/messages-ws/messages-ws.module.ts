import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// Propio
import { MessagesWsService } from './messages-ws.service';
import { MessagesWsGateway } from './messages-ws.gateway';

@Module({
  imports: [JwtModule],
  providers: [MessagesWsGateway, MessagesWsService],
})
export class MessagesWsModule {}
