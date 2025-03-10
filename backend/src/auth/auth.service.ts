import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  // 🔹 Utility function to hash passwords
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  // 🔹 User Registration
  async register(name: string, email: string, password: string) {
    const hashedPassword = await this.hashPassword(password);

    const user = await this.prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return { message: 'User registered successfully', user };
  }

  // 🔹 Validate User (Reused in login & authentication strategies)
  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : null;
  }

  // 🔹 User Login
  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    if (!user) {
      return { message: 'Invalid credentials' };
    }

    // Generate JWT Token
    const token = this.jwtService.sign({ id: user.id, email: user.email });

    return { message: 'Login successful', access_token: token };
  }
}
