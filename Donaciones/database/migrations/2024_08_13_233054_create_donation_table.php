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
        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            $table->decimal('amount', 10, 2);
            $table->foreignId('campaign_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('payment_status')->default('pending'); // Estado del pago ('pending', 'approved', 'rejected', etc.)
            $table->string('payment_id')->nullable(); // ID del pago en MercadoPago
            $table->timestamps();
            $table->softDeletes();

            // Índices adicionales para mejorar el rendimiento
            $table->index('payment_status');
            $table->index('payment_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};
