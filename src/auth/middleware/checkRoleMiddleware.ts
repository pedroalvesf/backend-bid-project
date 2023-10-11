import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class CheckRoleMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    } try {
      const payload = this.jwtService.verify(token);
      if (payload.role === 'ADMIN') {
        next();
      } else {
        res.status(403).json({ message: 'Access not authorized' });
      }
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}