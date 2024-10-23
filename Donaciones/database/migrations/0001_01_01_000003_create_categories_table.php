<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {/*
        // Eliminar la clave foránea en la tabla campaigns antes de eliminar la tabla categories
        /*
        Schema::table('campaigns', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
        });

        // Ahora elimino la tabla categories
        Schema::dropIfExists('categories');*/
    }
};
