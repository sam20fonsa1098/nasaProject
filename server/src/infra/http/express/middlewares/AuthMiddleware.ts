import { Request, Response, NextFunction } from 'express';

class AuthMiddleware {
  public static async authenticate(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const isAuthenticated = !!request.user && request.isAuthenticated();
    if (!isAuthenticated) {
      return response.status(401).json({
        error: 'You must log in!',
      });
    }
    next();
  }
}

export { AuthMiddleware };
