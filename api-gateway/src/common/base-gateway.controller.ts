import { GatewayService } from '../gateway.service';

export interface RequestHeaders {
  authorization?: string;
  [key: string]: string | undefined;
}

export abstract class BaseGatewayController {
  protected constructor(
    protected readonly gateway: GatewayService,
    protected readonly serviceUrl: string,
  ) {}

  protected buildUrl(path: string): string {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${this.serviceUrl}${cleanPath}`;
  }

  protected async proxyGet(path: string, headers?: RequestHeaders): Promise<any> {
    return this.gateway.get(this.buildUrl(path), headers as Record<string, string>);
  }

  protected async proxyPost(
    path: string,
    body: any,
    headers?: RequestHeaders,
  ): Promise<any> {
    return this.gateway.post(this.buildUrl(path), body, headers as Record<string, string>);
  }

  protected async proxyPut(
    path: string,
    body: any,
    headers?: RequestHeaders,
  ): Promise<any> {
    return this.gateway.put(this.buildUrl(path), body, headers as Record<string, string>);
  }

  protected async proxyPatch(
    path: string,
    body: any,
    headers?: RequestHeaders,
  ): Promise<any> {
    return this.gateway.patch(this.buildUrl(path), body, headers as Record<string, string>);
  }

  protected async proxyDelete(path: string, headers?: RequestHeaders): Promise<any> {
    return this.gateway.delete(this.buildUrl(path), headers as Record<string, string>);
  }
}
