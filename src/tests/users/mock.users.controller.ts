import { UserRole } from "@prisma/client";

const mockUsers = [
  {
    id: 1,
    email: 'user1@example.com',
    password: 'password123',
    role: UserRole.USER,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    email: 'user2@example.com',
    password: 'password456',
    role: UserRole.ADMIN,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    email: 'user3@example.com',
    password: '12345678',
    role: UserRole.PROVIDER,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

const mockUser = {
  id: 3,
  email: 'newuser@example.com',
  // Add other user properties as needed
};

const mockUpdatedUser = {
  id: 1,
  email: 'updateduser1@example.com',
  // Add other updated user properties as needed
};

const mockRemovedUser = {
  id: 2,
  email: 'removeduser2@example.com',
  // Add other removed user properties as needed
};

export { mockRemovedUser, mockUpdatedUser, mockUser, mockUsers };

