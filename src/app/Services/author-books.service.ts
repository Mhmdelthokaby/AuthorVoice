import { Injectable } from '@angular/core';
import { SupabaseService } from '../Services/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorBooksService {
  constructor(private supabaseService: SupabaseService) {}

  // Get all books of the current user
  async getMyBooks() {
    const user = await this.supabaseService.getUser();
    const { data, error } = await this.supabaseService.from('books')
      .select('*')
      .eq('author_id', user?.id); // Only books of current user
    if (error) throw error;
    return data;
  }
  

  // Create a new book
  async createBook(bookData: any) {
    const { data, error } = await this.supabaseService.from('books')
      .insert([bookData]);

    if (error) throw error;
    return data;
  }

  // Update a book
  async updateBook(bookId: string, bookData: any) {
    const { data, error } = await this.supabaseService.from('books')
      .update(bookData)
      .eq('id', bookId);

    if (error) throw error;
    return data;
  }

  // Delete a book
  async deleteBook(bookId: string) {
    const { data, error } = await this.supabaseService.from('books')
      .delete()
      .eq('id', bookId);

    if (error) throw error;
    return data;
  }
  
}
