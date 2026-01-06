import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Root endpoint - API Gateway health check' })
  getRoot() {
    return {
      service: 'YouShop API Gateway',
      status: 'running',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      endpoints: {
        docs: '/api',
        auth: '/auth',
        catalog: '/catalog',
        orders: '/orders',
        inventory: '/inventory'
      }
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  getHealth() {
    return {
      status: 'healthy',
      service: 'api-gateway',
      timestamp: new Date().toISOString()
    };
  }
}
