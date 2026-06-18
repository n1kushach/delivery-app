import type { AuthError, Session, User } from '@supabase/supabase-js';

export type Role = 'customer' | 'driver' | 'admin';

export type SignUpResult =
  | { success: false; error: AuthError; message: string }
  | { success: true; data: { user: User | null; session: Session | null } };

export type SignInResult =
  | { success: false; error: AuthError }
  | { success: true; data: { user: User; session: Session } };

export interface Profile {
  id: string;
  name: string;
  phone: string;
  role: Role;
  created_at: string;
}
