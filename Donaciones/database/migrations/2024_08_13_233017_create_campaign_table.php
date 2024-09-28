<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('campaigns', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->decimal('goal', 10, 2);
            $table->date('start_date');
            $table->date('end_date');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('youtube_link')->nullable(); // Campo para el enlace de YouTube
            $table->timestamps();
            $table->softDeletes();
        });

        // Nueva tabla para almacenar múltiples imágenes relacionadas con campañas
      Schema::create('campaign_images', function (Blueprint $table) {
        $table->id();
        $table->foreignId('campaign_id')->constrained()->onDelete('cascade');
        $table->string('path');
        $table->timestamps();
    });
    }

    public function down()
    {
        Schema::dropIfExists('campaign_images');
        Schema::dropIfExists('campaigns');
    }
};
