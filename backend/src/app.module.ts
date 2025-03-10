import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module'; // Updated import path
import { TaskModule } from './task/task.module';

@Module({
  imports: [UserModule, AuthModule, PrismaModule, TaskModule], // Added TaskModule here
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
