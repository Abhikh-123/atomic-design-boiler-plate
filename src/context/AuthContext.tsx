import { createContext } from 'react';

export type User = { id: string; email: string } | null;

export type AuthContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
