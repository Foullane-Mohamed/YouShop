import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GatewayService {
  constructor(private httpService: HttpService) {}

  async get(url: string, headers?: Record<string, string>) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { headers }),
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);    }
  }

  async post(url: string, data: any, headers?: Record<string, string>) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(url, data, { headers }),
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);    }
  }

  async put(url: string, data: any, headers?: Record<string, string>) {
    try {
      const response = await firstValueFrom(
        this.httpService.put(url, data, { headers }),
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);    }
  }

  async patch(url: string, data: any, headers?: Record<string, string>) {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(url, data, { headers }),
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);    }
  }

  async delete(url: string, headers?: Record<string, string>) {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(url, { headers }),
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);    }
  }

  private handleError(error: any) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || 'Service error';
      const err: any = new Error(message);
      err.status = status;
      return err;
    }
    return new Error('Service unavailable');
  }
}
