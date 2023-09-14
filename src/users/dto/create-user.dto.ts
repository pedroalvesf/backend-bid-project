import { UserRole } from "@prisma/client";

export class CreateUserDto {
  username: string;
  password: string;
  email: string;
  name: string;
  role: UserRole;
}
