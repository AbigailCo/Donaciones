<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotesTable extends Migration
{
    public function up()
    {
        Schema::create('notes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('campaign_id'); // Relación con campañas
            $table->text('note'); // Contenido de la nota
            $table->timestamps();

            // Foreign key para referenciar campañas
            $table->foreign('campaign_id')->references('id')->on('campaigns')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('notes');
    }
}

