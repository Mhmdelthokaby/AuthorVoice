// author.service.ts
import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { AuthService } from './auth.service';
import { UserProfile } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  constructor(
    private supabaseService: SupabaseService,
    private authService: AuthService
  ) {}

  // author.service.ts
// author.service.ts
// author.service.ts
async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
  const user = await this.authService.getUser();
  const userId = user?.id;
  if (!userId) throw new Error('Not authenticated');

  // 2) Update + return the updated row(s) by representation
  const { data, error } = await this.supabaseService
  .from('authors')
  .update(updates)
  .eq('user_id', userId)
  .select('*')  // <-- This triggers "returning representation"
  .single();    // <-- Because we expect exactly one result


  if (error) throw error;
  // data is an array of updated rows; with user_id PK it will be length=1
  return data![0];
}



}
