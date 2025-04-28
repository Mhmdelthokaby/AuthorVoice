import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service'; // Supabase service to handle Supabase calls

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private supabaseService: SupabaseService) {}

  // Update user role
  async updateUserRole(userId: string, newRole: 'admin' | 'author' | 'publishing_house') {
    try {
      const { data, error } = await this.supabaseService
        .from('users') // Now you can use 'from' to interact with the 'users' table
        .update({ role: newRole })
        .match({ id: userId });

      if (error) {
        throw error; // Handle error
      }

      return data; // Successfully updated role
    } catch (error) {
      console.error('Error updating role:', error);
      throw new Error('Failed to update role');
    }
  }
}
