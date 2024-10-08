<?php

use App\Console\Commands\DeleteProduct;
use App\Console\Commands\CreateProduct;
use App\Console\Commands\CreateCategoryCommand;
use App\Console\Commands\DeleteCategoryCommand;
use Illuminate\Support\Facades\Artisan;


Artisan::command('product:delete {id}', function ($id) {
    $this->call(DeleteProduct::class, ['id' => $id]);
})->describe('Delete a product');

Artisan::command('product:create {name} {description} {price} {category_id}', function ($name, $description, $price, $category_id) {
    $this->call(CreateProduct::class, [
        'name' => $name,
        'description' => $description,
        'price' => $price,
        'category_id' => $category_id,
    ]);
})->describe('Create a new product');

Artisan::command('category:create {name} {parent_id?}', function ($name, $parent_id = null) {
    $this->call(CreateCategoryCommand::class, [
        'name' => $name,
        'parent_id' => $parent_id,
    ]);
})->describe('Create a new category');

Artisan::command('category:delete {id}', function ($id) {
    $this->call(DeleteCategoryCommand::class, [
        'id' => $id,
    ]);
})->describe('Delete a category by ID');
