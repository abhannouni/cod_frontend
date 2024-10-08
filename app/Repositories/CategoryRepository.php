<?php
namespace App\Repositories;

use App\Models\Category;

class CategoryRepository
{
    public function create(array $data)
    {
        return Category::create($data);
    }

    public function delete(int $id)
    {
        return Category::destroy($id);
    }

    public function findById(int $id)
    {
        return Category::find($id);
    }

    public function all()
    {
        return Category::all();
    }
}
