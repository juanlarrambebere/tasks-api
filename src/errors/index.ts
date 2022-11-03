export class ApiError implements Error {
  name: string;
  message: string;
  status: number;
  details?: any;

  constructor(message: string, status: number, code: string, details: any) {
    this.message = message;
    this.status = status;
    this.name = code;
    this.details = details;
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string, details: any = null) {
    super(message, 400, "bad_request", details);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string, details: any = null) {
    super(message, 401, "unauthorized", details);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string, details: any = null) {
    super(message, 403, "forbidden", details);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string, details: any = null) {
    super(message, 403, "not_found", details);
  }
}
