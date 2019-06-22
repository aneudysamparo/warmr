import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, '../config/**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    EventsModule,
  ],
})

export class AppModule { }
