import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SupabaseService } from './supabase.service';
import { User, Session, AuthResponse } from '@supabase/supabase-js';

type UserRole = 'admin' | 'author' | 'publishing-house';

interface UserProfile {
  id?: string;  // Made optional with ?
  email?: string;
  role?: UserRole;
  name?: string;
  phone?: string;
  // Add all other fields from your authors table
  [key: string]: any; // For additional dynamic properties
}

interface AppUser extends User {
  profile?: UserProfile;
  role: UserRole;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<AppUser | null>(null);
  private userProfileCache = new Map<string, UserProfile>();

  constructor(private supabaseService: SupabaseService) {
    this.loadSession();
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validatePassword(password: string): boolean {
    return password.length >= 6;
  }

  async getUser(): Promise<AppUser | null> {
    try {
      const user = await this.supabaseService.getUser();
      if (!user) return null;

      let profile = this.userProfileCache.get(user.id);
      const metadata = user.user_metadata as { role?: UserRole };
      const defaultRole: UserRole = 'author';

      if (!profile) {
        try {
          profile = await this.supabaseService.getUserProfile(user.id) || {};
          if (profile && user.id) {
            profile.id = user.id; // Ensure id is set from auth user
            this.userProfileCache.set(user.id, profile);
          }
        } catch (error) {
          console.warn('Profile fetch warning:', error);
          profile = {};
        }
      }

      const fullUser: AppUser = {
        ...user,
        profile,
        role: metadata?.['role'] || profile?.role || defaultRole
      };

      this.setUser(fullUser);
      return fullUser;
    } catch (error) {
      console.error('User fetch error:', error);
      return null;
    }
  }

  get currentUser(): Observable<AppUser | null> {
    return this.currentUserSubject.asObservable();
  }

  private setUser(user: AppUser | null): void {
    this.currentUserSubject.next(user);
  }

  private async loadSession(): Promise<void> {
    try {
      const session = await this.supabaseService.getSession();
      if (session?.user) {
        await this.getUser();
      }
    } catch (error) {
      console.error('Session load error:', error);
    }
  }

  async signUp(
    email: string,
    password: string,
    role: UserRole = 'author',
    profileData: Partial<UserProfile> = {}
  ): Promise<AuthResponse> {
    if (!this.validateEmail(email)) {
      throw new Error('Invalid email format.');
    }
    if (!this.validatePassword(password)) {
      throw new Error('Password must be at least 6 characters long.');
    }
  
    try {
      const response = await this.supabaseService.signUp({
        email,
        password,
        options: {
          data: {
            ['role']: role
          }
        }
      });
  
      if (response.data?.user?.id) {
        try {
          // Insert empty author data into the 'authors' table
          await this.supabaseService.from('authors').insert({
            user_id: response.data.user.id,  // Link author to the user
            name: '',  // Empty data for name
            phone: '', // Empty data for phone (add other fields as required)
            // Add any other required columns with empty values
          });
  
          // Also, update the 'users' table if needed (you can add custom profile data)
          await this.supabaseService.from('users').upsert({
            id: response.data.user.id,
            email: response.data.user.email,
            role,
            ...profileData
          });
        } catch (error) {
          console.warn('Profile creation warning:', error);
        }
  
        await this.getUser();
      }
  
      return response;
    } catch (error) {
      console.error('Sign-up error:', error);
      throw new Error(`Sign-up failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  

  async login(email: string, password: string): Promise<AuthResponse> {
    if (!this.validateEmail(email)) {
      throw new Error('Invalid email format.');
    }
    if (!this.validatePassword(password)) {
      throw new Error('Password must be at least 6 characters long.');
    }

    try {
      const response = await this.supabaseService.signInWithPassword({ email, password });
      if (response.data?.user) {
        await this.getUser();
      }
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.supabaseService.signOut();
      this.userProfileCache.clear();
      this.setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error(`Logout failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async hasRole(requiredRole: UserRole): Promise<boolean> {
    const user = await this.getUser();
    return user?.role === requiredRole;
  }

  async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<void> {
    if (!userId) {
      throw new Error('User ID is required for profile update');
    }
  
    try {
      const { data, error } = await this.supabaseService.from('authors')
        .update(updates)
        .eq('user_id', userId);
  
      console.log('Data:', data);  // Log the data
      if (error) {
        console.error('Error:', error);  // Log the error if it occurs
        throw error;
      }
  
      alert('Profile updated successfully');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Profile update error:', error.message);
        alert(`An error occurred while updating your profile: ${error.message}`);
      } else {
        console.error('An unknown error occurred:', error);
        alert('An unknown error occurred while updating your profile.');
      }
    }
  }
  
  
  
  

  // Add this to your existing AuthService
  async getAuthorProfile(): Promise<any> {
    const user = await this.getUser();
    if (!user?.id) return null;

    try {
      return await this.supabaseService.from('authors')
        .select('*')
        .eq('user_id', user.id)
        .single();
    } catch (error) {
      console.error('Error getting author profile:', error);
      return null;
    }
  }

}