import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(userId: string, data: CreateTaskDto) {
    return this.prisma.task.create({
      data: { ...data, userId },
    });
  }

  async getAllTasks(userId: string) {
    return this.prisma.task.findMany({
      where: { userId },
    });
  }

  async getTaskById(id: string, userId: string) {
    const task = await this.prisma.task.findUnique({
      where: { id, userId },
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async updateTask(id: string, userId: string, data: UpdateTaskDto) {
    const task = await this.getTaskById(id, userId);
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async deleteTask(id: string, userId: string) {
    await this.getTaskById(id, userId);
    return this.prisma.task.delete({ where: { id } });
  }
}
