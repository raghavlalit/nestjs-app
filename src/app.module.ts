import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsletterModule } from './newsletter/newsletter.module';
import { User } from './users/entities/user.entity';
import { Newsletter } from './newsletter/entities/newsletter.entity';
import { DataSource } from 'typeorm';
import { MailModule } from './mail/mail.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [AuthModule, UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nest-app-test',
      entities: [User, Newsletter],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NewsletterModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
