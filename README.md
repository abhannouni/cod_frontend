# Laravel Project Setup

This document outlines the steps to set up and run the Laravel project, including command descriptions.

## Prerequisites

- PHP (version 8.0 or higher)
- Composer
- SQLite or another database management system (MySQL, PostgreSQL, etc.)
- Node.js and npm (for front-end dependencies)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/abhannouni/cod_backend.git
cd cod_backend
```

## Install PHP Dependencies

### Run the following command to install the necessary PHP dependencies:

```
composer install
```

## Set Up Environment File

### Copy the .env.example file to a new file named .env:

```
cp .env.example .env
```

## Set Up Database

1. Create a new database in your DBMS (e.g., SQLite, MySQL).

2. Update your .env file with the correct database configuration.

## Run Migrations

### Run the migrations to set up your database schema:

```
php artisan migrate
```

## Run the Development Server

### To start the Laravel development server, run the following command:

```
php artisan serve
```

## Available Commands

### Create Product

```
php artisan app:product:create {name} {price} {category_id}
```

### Delete Product

```
php artisan product:delete {id}
```

### Create Category

```
php artisan category:create {name}
```

### Delete Category 

```
php artisan category:delete {id}
```

## Run the Tests

 ```
 php artisan test
 ```