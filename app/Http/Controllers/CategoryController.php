<?php

namespace App\Http\Controllers;

use App\Services\CategoryService;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    protected $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function create(Request $request)
    {
        $data = $request->only(['name', 'parent_id']);
        $this->categoryService->createCategory($data);

        return response()->json(['message' => 'Category created']);
    }

    public function delete($id)
    {
        $this->categoryService->deleteCategory($id);
        return response()->json(['message' => 'Category deleted']);
    }

    public function browse()
    {
        $categories = $this->categoryService->browseCategories();
        return response()->json($categories);
    }
}
