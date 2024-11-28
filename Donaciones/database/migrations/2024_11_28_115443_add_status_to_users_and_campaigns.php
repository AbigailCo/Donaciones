<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
{
    Schema::table('users', function (Blueprint $table) {
        $table->string('status')->default('active'); // Estado por defecto
    });

    Schema::table('campaigns', function (Blueprint $table) {
        $table->string('status')->default('active'); // Estado por defecto
    });
}

public function down()
{
    Schema::table('users', function (Blueprint $table) {
        $table->dropColumn('status');
    });

    Schema::table('campaigns', function (Blueprint $table) {
        $table->dropColumn('status');
    });
}

};
