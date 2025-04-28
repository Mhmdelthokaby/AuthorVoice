import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User, Session, AuthResponse } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  private handleError(error: unknown, defaultMessage: string): Error {
    if (error instanceof Error) {
      return new Error(error.message || defaultMessage);
    }
    return new Error(defaultMessage);
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validatePassword(password: string): boolean {
    return password.length >= 6;
  }

  // Updated signUp method to accept options
  async signUp(params: { email: string; password: string; options?: any }): Promise<AuthResponse> {
    const { email, password, options } = params;
    
    if (!this.validateEmail(email)) {
      throw new Error('Invalid email format.');
    }
    if (!this.validatePassword(password)) {
      throw new Error('Password must be at least 6 characters long.');
    }

    try {
      return await this.supabase.auth.signUp({
        email,
        password,
        options
      });
    } catch (error) {
      throw this.handleError(error, 'Sign-up failed.');
    }
  }

  // Add the missing signInWithPassword method
  async signInWithPassword(params: { email: string; password: string }): Promise<AuthResponse> {
    const { email, password } = params;
    
    if (!this.validateEmail(email)) {
      throw new Error('Invalid email format.');
    }
    if (!this.validatePassword(password)) {
      throw new Error('Password must be at least 6 characters long.');
    }

    try {
      return await this.supabase.auth.signInWithPassword({
        email,
        password
      });
    } catch (error) {
      throw this.handleError(error, 'Sign-in failed.');
    }
  }

  // Keep existing signIn method for backward compatibility
  async signIn(email: string, password: string): Promise<any> {
    return this.signInWithPassword({ email, password });
  }

  async getSession(): Promise<Session | null> {
    try {
      const { data, error } = await this.supabase.auth.getSession();
      if (error) {
        throw this.handleError(error, 'Failed to fetch session.');
      }
      return data?.session ?? null;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch session.');
    }
  }

  async getUser(): Promise<User | null> {
    try {
      const session = await this.getSession();
      return session?.user ?? null;
    } catch (error) {
      throw this.handleError(error, 'Failed to get user.');
    }
  }

  async signOut(): Promise<void> {
    try {
      const { error } = await this.supabase.auth.signOut();
      if (error) {
        throw this.handleError(error, 'Sign-out failed.');
      }
    } catch (error) {
      throw this.handleError(error, 'Sign-out failed.');
    }
  }

  from(tableName: string) {
    if (!tableName) {
      throw new Error('Table name is required.');
    }
    return this.supabase.from(tableName);
  }

  async getUserProfile(userId: string): Promise<any> {
    if (!userId) {
      throw new Error('User ID is required.');
    }

    try {
      const { data, error } = await this.supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .maybeSingle(); // Changed from single() to maybeSingle()

      if (error) {
        throw this.handleError(error, 'Failed to fetch user profile.');
      }
      return data;
    } catch (error) {
      console.error('Profile fetch error:', error);
      return null; // Return null instead of throwing to prevent auth flow breakage
    }
  }
}