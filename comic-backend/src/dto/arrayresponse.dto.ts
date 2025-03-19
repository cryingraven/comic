
export class ArrayResponseDto {
  constructor(
    public readonly status: number,
    public readonly message: string,
    public readonly data: any[],
  ) {}
  static success(message: string, data: any[]): ArrayResponseDto {
    return new ArrayResponseDto(200, message, data);
  }
  static error(message: string, data: any[]): ArrayResponseDto {
    return new ArrayResponseDto(500, message, data);
  }
  static notFound(message: string, data: any[]): ArrayResponseDto {
    return new ArrayResponseDto(404, message, data);
  }
  static unauthorized(message: string, data: any[]): ArrayResponseDto {
    return new ArrayResponseDto(401, message, data);
  }
  static forbidden(message: string, data: any[]): ArrayResponseDto {
    return new ArrayResponseDto(403, message, data);
  }
  static badRequest(message: string, data: any[]): ArrayResponseDto {
    return new ArrayResponseDto(400, message, data);
  }
}