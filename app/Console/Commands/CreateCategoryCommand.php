<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Category; // Make sure to import the Category model

class CreateCategoryCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'category:create {name} {parent_id?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new category';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $name = $this->argument('name');
        $parent_id = $this->argument('parent_id') ?? null; // Default to an empty string if not provided

        // Create the category using the Category model
        $category = Category::create([
            'name' => $name,
            'parent_id' => $parent_id,
        ]);

        $this->info("Category '$name' created successfully!");
    }
}
