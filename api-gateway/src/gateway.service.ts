import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

/**
 * Gateway Service
 * Handles HTTP forwarding to microservices
 */
@Injectable()
export class GatewayService {
  constructor(private httpService: HttpService) {}

  /**
   * Forward GET request to a microservice
   */
  async get(url: string, headers?: Record<string, string>) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { headers }),
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Forward POST request to a microservice
   */
  async post(url: string, data: any, headers?: Record<string, string>) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(url, data, { headers }),
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Forward PUT request to a microservice
   */
  async put(url: string, data: any, headers?: Record<string, string>) {
    try {
      const response = await firstValueFrom(
        this.httpService.put(url, data, { headers }),
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Forward PATCH request to a microservice
   */
  async patch(url: string, data: any, headers?: Record<string, string>) {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(url, data, { headers }),
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Forward DELETE request to a microservice
   */
  async delete(url: string, headers?: Record<string, string>) {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(url, { headers }),
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Handle errors from microservices
   */
  private handleError(error: any) {
    if (error.response) {
      // Forward the error from the microservice
      const status = error.response.status;
      const message = error.response.data?.message || 'Service error';
      const err: any = new Error(message);
      err.status = status;
      return err;
    }
    return new Error('Service unavailable');
  }
}
