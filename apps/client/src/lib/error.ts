function isString(value: any) {
  return typeof value === 'string';
}

function isObject(value: any) {
  return typeof value === 'object' && value !== null;
}
export class CustomBaseException extends Error {
  constructor(
    private readonly response: string | Record<string, any>,
    private readonly status: number
  ) {
    super();
    this.initMessage();
  }

  public initMessage() {
    if (isString(this.response)) {
      if (typeof this.response === 'string') {
        this.message = this.response;
      }
    } else if (isObject(this.response) && isString((this.response as Record<string, any>).message)) {
      this.message = (this.response as Record<string, any>).message;
    } else if (this.constructor) {
      // @ts-ignore
      this.message = this.constructor.name.match(/[A-Z][a-z]+|[0-9]+/g).join(' ');
    }
  }

  public getResponse(): string | object {
    return this.response;
  }

  public getStatus(): number {
    return this.status;
  }
  public getBusinessCode() {
    if (isObject(this.response)) {
      // @ts-ignore
      return this.response?.code || this.status;
    }
    return this.status;
  }

  public static createBody(objectOrError: object | string, message?: string, statusCode?: number) {
    if (!objectOrError) {
      return { statusCode, message };
    }
    return isObject(objectOrError) && !Array.isArray(objectOrError)
      ? objectOrError
      : { statusCode, message: objectOrError, error: message };
  }
}
