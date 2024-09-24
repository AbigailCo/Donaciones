<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Donation extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'amount', 
        'campaign_id', 
        'user_id', 
        'payment_status', // Añadido para permitir actualizar el estado del pago
        'payment_id',     // Añadido para almacenar el ID de la transacción de MercadoPago
    ];

    /**
     * Relación con la campaña.
     */
    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }

    /**
     * Relación con el usuario.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope para filtrar donaciones por estado de pago.
     */
    public function scopeByPaymentStatus($query, $status)
    {
        return $query->where('payment_status', $status);
    }

    /**
     * Mutador para el campo 'amount' para asegurarse de que siempre se guarda como un decimal.
     */
    public function setAmountAttribute($value)
    {
        $this->attributes['amount'] = round($value, 2);
    }

    /**
     * Método para verificar si la donación fue aprobada.
     */
    public function isApproved()
    {
        return $this->payment_status === 'approved';
    }
}
