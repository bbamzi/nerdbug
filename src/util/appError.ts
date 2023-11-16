export class AppError extends Error {
  statusCode: Number;

  status: string;
  constructor(message: string | undefined, statusCode: Number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
  }
}
