<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductCreationTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_create_a_product()
    {
        // Arrange: Create a category to associate with the product
        $category = Category::create(['name' => 'Test Category']);

        // Act: Make a post request to create a product
        $response = $this->postJson('/api/products', [
            'name' => 'Test Product',
            'price' => 99.99,
            'category_id' => $category->id,
            'description' => 'This is a test product description.',
        ]);

        // Assert: Check if the product was created in the database
        $response->assertStatus(201); // Check if the response status is 201 (Created)
        $this->assertDatabaseHas('products', [
            'name' => 'Test Product',
            'price' => 99.99,
            'category_id' => $category->id,
        ]);
    }

    /** @test */
    public function it_requires_a_name()
    {
        // Arrange: Create a category
        $category = Category::create(['name' => 'Test Category']);

        // Act: Make a post request without the name
        $response = $this->postJson('/api/products', [
            'price' => 99.99,
            'category_id' => $category->id,
        ]);

        // Assert: Check if the validation fails
        $response->assertStatus(422); // Check if the response status is 422 (Unprocessable Entity)
        $response->assertJsonValidationErrors(['name']);
    }

    /** @test */
    public function it_requires_a_valid_category_id()
    {
        // Act: Make a post request with an invalid category ID
        $response = $this->postJson('/api/products', [
            'name' => 'Test Product',
            'price' => 99.99,
            'category_id' => 999, // Assuming this ID does not exist
        ]);

        // Assert: Check if the validation fails
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['category_id']);
    }
}
