export interface ServiceConfig {
  readonly authServiceUrl: string;
  readonly catalogServiceUrl: string;
  readonly orderServiceUrl: string;
  readonly inventoryServiceUrl: string;
}

export const servicesConfig: ServiceConfig = {
  authServiceUrl: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
  catalogServiceUrl: process.env.CATALOG_SERVICE_URL || 'http://localhost:3002',
  orderServiceUrl: process.env.ORDER_SERVICE_URL || 'http://localhost:3003',
  inventoryServiceUrl: process.env.INVENTORY_SERVICE_URL || 'http://localhost:3004',
};
