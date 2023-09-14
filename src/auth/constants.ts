import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret: 'superSecretKey',
};

export const bcryptSalt = 10;

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
