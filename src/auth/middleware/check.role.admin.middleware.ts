import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class CheckRoleAdminMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      res.status(401).json({ message: 'Token must be used' });
      return;
    }
    
    try {
      const payload = this.jwtService.decode(token) as { role: string };
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