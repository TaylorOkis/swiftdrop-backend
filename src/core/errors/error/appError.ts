export default class AppError extends Error {
  statusCode: any;
  constructor(message: string) {
    super(message);
  }
}
