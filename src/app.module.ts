import { Module, NestModule,MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module'
import {LoggerMiddleware, NoSniffMiddleware, XPoweredByMiddleware} from './middleware'

import {interceptorProviders} from './helpers/interceptor'

import { EmailSendModule } from './modules/email-send/email-send.module';
import { KafkaModule } from './config/kafka/kafka.module'
import { AuthModule } from './modules/auth/auth.module';
import { ApifetchModule } from './modules/apifetch/apifetch.module';
import { UserModule } from './modules/user/user.module'
import { RedisModule } from './config/redis/redis.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    DatabaseModule,
    RedisModule,
    KafkaModule,
    EmailSendModule,
    AuthModule,
    ApifetchModule,
    UserModule
  ],
  controllers: [

  ],
  providers: [

     ...interceptorProviders
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
    .apply(LoggerMiddleware)
    .forRoutes('*');
  }
}
