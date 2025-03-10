import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard) // Protect with JWT
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  createTask(@Req() req, @Body() data: CreateTaskDto) {
    return this.taskService.createTask(req.user.id, data);
  }

  @Get()
  getAllTasks(@Req() req) {
    return this.taskService.getAllTasks(req.user.id);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string, @Req() req) {
    return this.taskService.getTaskById(id, req.user.id);
  }

  @Put(':id')
  updateTask(@Param('id') id: string, @Req() req, @Body() data: UpdateTaskDto) {
    return this.taskService.updateTask(id, req.user.id, data);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string, @Req() req) {
    return this.taskService.deleteTask(id, req.user.id);
  }
}
