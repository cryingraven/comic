export class BasicResponseDto {
  constructor(
    public readonly status: number,
    public readonly message: string,
    public readonly data: any,
  ) {}
  static success(message: string, data: any): BasicResponseDto {
    return new BasicResponseDto(200, message, data);
  }
  static error(message: string, data: any): BasicResponseDto {
    return new BasicResponseDto(500, message, data);
  }
  static notFound(message: string, data: any): BasicResponseDto {
    return new BasicResponseDto(404, message, data);
  }
  static unauthorized(message: string, data: any): BasicResponseDto {
    return new BasicResponseDto(401, message, data);
  }
  static forbidden(message: string, data: any): BasicResponseDto {
    return new BasicResponseDto(403, message, data);
  }
  static badRequest(message: string, data: any): BasicResponseDto {
    return new BasicResponseDto(400, message, data);
  }
  static conflict(message: string, data: any): BasicResponseDto {
    return new BasicResponseDto(409, message, data);
  }
  static unprocessableEntity(message: string, data: any): BasicResponseDto {
    return new BasicResponseDto(422, message, data);
  }
  static internalServerError(message: string, data: any): BasicResponseDto {
    return new BasicResponseDto(500, message, data);
  }
  static notImplemented(message: string, data: any): BasicResponseDto {
    return new BasicResponseDto(501, message, data);
  }
  static badGateway(message: string, data: any): BasicResponseDto {
    return new BasicResponseDto(502, message, data);
  }
  static serviceUnavailable(message: string, data: any): BasicResponseDto {
    return new BasicResponseDto(503, message, data);
  }
  static gatewayTimeout(message: string, data: any): BasicResponseDto {
    return new BasicResponseDto(504, message, data);
  }
  static httpVersionNotSupported(message: string, data: any): BasicResponseDto {
    return new BasicResponseDto(505, message, data);
  }
  static variantAlsoNegotiates(message: string, data: any): BasicResponseDto {
    return new BasicResponseDto(506, message, data);
  }
  static insufficientStorage(message: string, data: any): BasicResponseDto {
    return new BasicResponseDto(507, message, data);
  }
  static loopDetected(message: string, data: any): BasicResponseDto {
    return new BasicResponseDto(508, message, data);
  }
  static notExtended(message: string, data: any): BasicResponseDto {
    return new BasicResponseDto(510, message, data);
  }
  static networkAuthenticationRequired(
    message: string,
    data: any,
  ): BasicResponseDto {
    return new BasicResponseDto(511, message, data);
  }
}
