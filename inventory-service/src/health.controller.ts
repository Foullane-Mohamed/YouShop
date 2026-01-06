import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Root endpoint - Service info' })
  getRoot() {
    return {
      service: 'Inventory Service',
      status: 'running',
      version: '1.0.0',
      timestamp: new Date().toISOString()
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  getHealth() {
    return { status: 'healthy', service: 'inventory-service', timestamp: new Date().toISOString() };
  }
}
