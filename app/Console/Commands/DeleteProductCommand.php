<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class DeleteProductCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:product:delete {id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete a product';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $id = $this->argument('id');

        // Assuming you have a Product model
        $product = \App\Models\Product::find($id);

        if ($product) {
            $product->delete();
            $this->info('Product deleted successfully.');
        } else {
            $this->error('Product not found.');
        }
    }
}
