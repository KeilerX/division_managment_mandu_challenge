<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Division extends Model
{
    use HasFactory;
    public function superiorDivision() {
        return $this->belongsTo(Division::class, 'superior_division_id')->select(['name']);
    }
    /* public function subDivisions() {
        return $this->hasMany('Division', 'superior_division_id', 'id');
    }

    public function superiorDivision() {
        return $this->subDivisions()->with('superiorDivision');
    } */
}
