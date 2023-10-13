import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class CheckRoleProviderMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    try {
      const payload = this.jwtService.decode(token) as { role: string };
      if (payload.role === 'PROVIDER') {
        next();
      } else {
        res.status(403).json({ message: 'Must be a provider account' });
      }
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}