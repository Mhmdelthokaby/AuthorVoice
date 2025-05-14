using Domain;
using Domain.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace authors_voice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublishingHouseController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public PublishingHouseController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // ... existing GetById and other methods ...

        // PUT: api/PublishingHouse/{publishingHouseId}/Book/{bookId}/text
        [HttpPut("{publishingHouseId}/Book/{bookId}/text")]
        public async Task<IActionResult> UpdateBookText(int publishingHouseId, int bookId, [FromBody] BookTextDto updatedBook)
        {
            // First verify the publishing house exists
            var publishingHouse = await _unitOfWork.PublishingHouses
                .Query()
                .Include(ph => ph.Books)
                .FirstOrDefaultAsync(ph => ph.Id == publishingHouseId);

            if (publishingHouse == null)
            {
                return NotFound("Publishing house not found");
            }

            // Find the book and verify it belongs to this publishing house
            var existing = await _unitOfWork.PublishingHouseBooks.GetByIdAsync(bookId);
            if (existing == null || !publishingHouse.Books.Any(b => b.Id == bookId))
            {
                return NotFound("Book not found or does not belong to this publishing house");
            }

            existing.Title = updatedBook.Title;
            existing.Author = updatedBook.Author;
            existing.Description = updatedBook.Description;
            existing.PublishingDate = updatedBook.PublishingDate;

            _unitOfWork.PublishingHouseBooks.Update(existing);
            await _unitOfWork.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/PublishingHouse/{publishingHouseId}/Book/{bookId}/image
        [HttpPut("{publishingHouseId}/Book/{bookId}/image")]
        public async Task<IActionResult> UpdateBookImage(int publishingHouseId, int bookId, [FromBody] BookImageDto updatedBook)
        {
            var publishingHouse = await _unitOfWork.PublishingHouses
                .Query()
                .Include(ph => ph.Books)
                .FirstOrDefaultAsync(ph => ph.Id == publishingHouseId);

            if (publishingHouse == null)
            {
                return NotFound("Publishing house not found");
            }

            var existing = await _unitOfWork.PublishingHouseBooks.GetByIdAsync(bookId);
            if (existing == null || !publishingHouse.Books.Any(b => b.Id == bookId))
            {
                return NotFound("Book not found or does not belong to this publishing house");
            }

            existing.CoverImgae = updatedBook.CoverImgae;

            _unitOfWork.PublishingHouseBooks.Update(existing);
            await _unitOfWork.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/PublishingHouse/{publishingHouseId}/Category/{categoryId}/text
        [HttpPut("{publishingHouseId}/Category/{categoryId}/text")]
        public async Task<IActionResult> UpdateCategoryText(int publishingHouseId, int categoryId, [FromBody] CategoryTextDto updatedCategory)
        {
            var publishingHouse = await _unitOfWork.PublishingHouses
                .Query()
                .Include(ph => ph.Publishing_House_Category)
                .FirstOrDefaultAsync(ph => ph.Id == publishingHouseId);

            if (publishingHouse == null)
            {
                return NotFound("Publishing house not found");
            }

            var existing = await _unitOfWork.PublishingHouseCategories.GetByIdAsync(categoryId);
            if (existing == null || !publishingHouse.Publishing_House_Category.Any(c => c.Id == categoryId))
            {
                return NotFound("Category not found or does not belong to this publishing house");
            }

            existing.Name = updatedCategory.Name;
            existing.Description = updatedCategory.Description;

            _unitOfWork.PublishingHouseCategories.Update(existing);
            await _unitOfWork.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/PublishingHouse/{publishingHouseId}/Category/{categoryId}/image
        [HttpPut("{publishingHouseId}/Category/{categoryId}/image")]
        public async Task<IActionResult> UpdateCategoryImage(int publishingHouseId, int categoryId, [FromBody] CategoryImageDto updatedCategory)
        {
            var publishingHouse = await _unitOfWork.PublishingHouses
                .Query()
                .Include(ph => ph.Publishing_House_Category)
                .FirstOrDefaultAsync(ph => ph.Id == publishingHouseId);

            if (publishingHouse == null)
            {
                return NotFound("Publishing house not found");
            }

            var existing = await _unitOfWork.PublishingHouseCategories.GetByIdAsync(categoryId);
            if (existing == null || !publishingHouse.Publishing_House_Category.Any(c => c.Id == categoryId))
            {
                return NotFound("Category not found or does not belong to this publishing house");
            }

            existing.Image = updatedCategory.Image;

            _unitOfWork.PublishingHouseCategories.Update(existing);
            await _unitOfWork.SaveChangesAsync();

            return NoContent();
        }

        // Similar updates for Service, Goal, Connect, and Join endpoints...
    }
} 