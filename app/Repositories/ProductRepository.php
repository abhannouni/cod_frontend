<?php
namespace App\Repositories;

use App\Models\Product;

class ProductRepository
{
    public function create(array $data)
    {
        return Product::create($data);
    }

    public function delete(int $id)
    {
        return Product::destroy($id);
    }

    public function findById(int $id)
    {
        return Product::find($id);
    }

        public function allPaginated($filters = [], $sortBy = 'name', $perPage = 10)
        {
            $query = Product::query();

            if (!empty($filters['category_ids'])) {
                $query->whereHas('categories', function($q) use ($filters) {
                    $q->whereIn('categories.id', $filters['category_ids']);
                });
            }

        
            $query->orderBy($sortBy);


            return $query->paginate($perPage);
        }
}
