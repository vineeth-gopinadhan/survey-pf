import { CustomError, ServiceError } from '../interfaces';

function parseServiceError(error: CustomError): ServiceError {
  let statusCode: number = 500;
  let message: string = 'Internal Server Error';

  if (error.message) {
    switch (error.message) {
      case 'Not Found':
        statusCode = 404;
        message = 'Not found';
        break;
      default:
        break;
    }
  }

  return { statusCode, message };
}

export { parseServiceError };
