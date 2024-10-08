<?php

namespace App\Http\Controllers;

use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function create(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_ids' => 'required|array',
            'category_ids.*' => 'exists:categories,id'
        ]);

        // Create the product
        $imageName = time().'.'.$request->image->extension();
        $request->image->move(public_path('images'), $imageName);
        $imageUrl = asset('images/' . $imageName);
        echo $imageUrl;
        $product = $this->productService->createProduct([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'price' => $validatedData['price'],
            'image' => 'images/'.$imageName
        ]);

        // Attach categories to the product
        if (isset($validatedData['category_ids'])) {
            $product->categories()->attach($validatedData['category_ids']);
        }

        return response()->json(['message' => 'Product created successfully', 'product' => $product, 'imageUrl' => $imageUrl], 201);
    }


    public function browse(Request $request)
    {
        $filters = $request->only(['category_ids']);
        $sortBy = $request->input('sortBy', 'name');
        $perPage = $request->get('per_page', 10);
        $products = $this->productService->getAllProducts($filters, $sortBy, $perPage);

        return response()->json($products);
    }
}
