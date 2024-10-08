<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Product;

class CreateProduct extends Command
{
    protected $signature = 'product:create {name} {description} {price} {category_id} {image?}';
    protected $description = 'Create a new product';

    public function handle()
    {
        $name = $this->argument('name');
        $price = $this->argument('price');
        $description = $this->argument('description');
        $category_id = $this->argument('category_id');
        $image = $this->argument('image') ?? null;  

        
        $product = Product::create([
            'name' => $name,
            'price' => $price,
            'description' => $description,
            'category_id' => $category_id,
        ]);

        if ($image) {
            $imageName = time().'.'.$image->extension();
            $image->move(public_path('images'), $imageName);
            $product->image_path = '/images/' . $imageName;
            $product->save();
        }

        $this->info("Product '$name' created successfully!");
    }
}
