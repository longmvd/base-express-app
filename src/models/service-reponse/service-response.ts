export interface ServiceResponse {
  data: any;
  isSuccess: boolean;
  code: number;
  userMessage?: string;
  systemMessage?: string;
}

export class ServiceResponseError extends Error implements ServiceResponse {
  data: any;
  isSuccess: boolean;
  code: number;
  userMessage?: string;
  systemMessage?: string;

  constructor(code: number, message: string, data: any = null) {
    super(message);
    this.code = code;
    this.data = data;
    this.isSuccess = false;
    this.systemMessage = message;
  }
}
