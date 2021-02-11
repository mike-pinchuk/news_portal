import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typedEnv } from './utils/typed-env';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    synchronize: true,
    host: typedEnv.DB_HOST,
    port: typedEnv.DB_PORT,
    username: typedEnv.DB_USER,
    password: typedEnv.DB_PASSWORD,
    database: typedEnv.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}']
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
