import { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    role?: string; // or whatever type your role is (string, enum, etc.)
    permissions?: string;
    project?: string;
    donor?: string;
  }

  interface Session {
    user: User;
  }
}
