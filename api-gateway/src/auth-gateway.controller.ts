import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GatewayService } from './gateway.service';
import { BaseGatewayController } from './common/base-gateway.controller';
import { servicesConfig } from './config/services.config';

@ApiTags('Auth')
@Controller('auth')
export class AuthGatewayController extends BaseGatewayController {
  constructor(gateway: GatewayService) {
    super(gateway, servicesConfig.authServiceUrl);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered' })
  async register(@Body() body: any) {
    return this.proxyPost('/register', body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  async login(@Body() body: any) {
    return this.proxyPost('/login', body);
  }
}
