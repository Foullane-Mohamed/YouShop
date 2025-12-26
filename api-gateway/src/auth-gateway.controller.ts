import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GatewayService } from './gateway.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthGatewayController {
  private authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';

  constructor(private gateway: GatewayService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered' })
  async register(@Body() body: any) {
    return this.gateway.post(`${this.authServiceUrl}/register`, body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  async login(@Body() body: any) {
    return this.gateway.post(`${this.authServiceUrl}/login`, body);
  }
}
