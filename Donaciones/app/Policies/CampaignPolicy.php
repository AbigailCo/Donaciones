<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\Campaign;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CampaignPolicy
{
    use HandlesAuthorization;

    public function update(User $user, Campaign $campaign)
    {
        // Solo el creador de la campaña puede actualizarla
        return $user->id === $campaign->user_id;
    }

    public function delete(User $user, Campaign $campaign)
    {
        // Solo el creador de la campaña puede eliminarla
        return $user->id === $campaign->user_id;
    }
}
