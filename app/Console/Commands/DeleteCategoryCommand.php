<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Category;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class DeleteCategoryCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'category:delete {id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete a category by ID';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $id = $this->argument('id');

        try {
            $category = Category::findOrFail($id); 

            $category->delete(); 

            $this->info("Category with ID '$id' deleted successfully!");
        } catch (ModelNotFoundException $e) {
            $this->error("Category with ID '$id' not found.");
        }
    }
}
