<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Division;

class DivisionController extends Controller
{
    public function index(Request $request) {
        if($request->sort_by && $request->sort_type) {
            $sort_by = $request->sort_by;
            $sort_type = $request->sort_type;
        } else {
            $sort_by = 'name';
            $sort_type = 'asc';
        }
        $skip = ($request->page-1) * $request->size;
        $divisions = Division::skip($skip)
        ->orderBy($sort_by, $sort_type)
        ->limit($request->size)
        ->get();
        foreach ($divisions as $d) {
            $d->superiorDivision;
        }
        $count = Division::all()->count();
        $pages = $count / $request->size;
        return response()->json(array(
            'data' => $divisions,
            'total' => $count,
            'pages' => $pages), 200);
    }

    public function show(Division $division) {
        $foundDivision = Division::findOrFail($division->id);
        $foundDivision->superiorDivision;
        return response()->json($foundDivision, 200);
    }

    public function store(Request $request) {
        $newDivision = new Division();
        $newDivision->name = $request->name;
        $newDivision->level = $request->level;
        $newDivision->collaborators = $request->collaborators;
        $newDivision->subdivisions = 0;
        $newDivision->ambassador_name = $request->ambassador_name;
        if($request->superior_division_id) {
            $newDivision->superior_division_id = $request->superior_division_id;
            $toUpdateSuperiorDivision = Division::find($request->superior_division_id);
            $toUpdateSuperiorDivision->subdivisions = $toUpdateSuperiorDivision->subdivisions + 1;
            $toUpdateSuperiorDivision->update();
        }
        $newDivision->save();
        return response()->json($newDivision, 201);
    }

    public function update(Request $request, Division $division) {
        $toUpdateDivision = Division::find($division->id);
        $toUpdateDivision->name = $request->name;
        $toUpdateDivision->level = $request->level;
        $toUpdateDivision->collaborators = $request->collaborators;
        $toUpdateDivision->subdivisions = $request->subdivisions;
        $toUpdateDivision->ambassador_name = $request->ambassador_name;
        if($request->superior_division_id && !$toUpdateDivision->superior_division_id) { //If to update division has no superior division
            $toUpdateDivision->superior_division_id = $request->superior_division_id;
            $toUpdateSuperiorDivision = Division::find($request->superior_division_id);
            $toUpdateSuperiorDivision->subdivisions = $toUpdateSuperiorDivision->subdivisions + 1;
            $toUpdateSuperiorDivision->update();
        } else { //If to update division has superior division
            //Update old superior division
            $old_superior_division_id = $toUpdateDivision->superior_division_id;
            $toUpdateOldSuperiorDivision = Division::find($old_superior_division_id);
            $toUpdateOldSuperiorDivision->subdivisions = $toUpdateOldSuperiorDivision->subdivisions - 1;
            $toUpdateOldSuperiorDivision->update();
            //Update new superior division
            $toUpdateNewSuperiorDivision = Division::find($request->superior_division_id);
            $toUpdateNewSuperiorDivision->subdivisions = $toUpdateNewSuperiorDivision->subdivisions + 1;
            $toUpdateNewSuperiorDivision->update();
            $toUpdateDivision->superior_division_id = $request->superior_division_id;
        }

        $toUpdateDivision->update();
        return response()->json($toUpdateDivision, 200);
    }

    public function destroy(Division $division) {
        $toDeleteDivision = Division::find($division->id);
        $toDeleteDivision->delete();
        return response()->json($toDeleteDivision, 200);
    }

    public function indexSubdivisions(Division $division) {
        $subDivisions = Division::where('superior_division_id', $division->id)->get();
        return response()->json($subDivisions, 200);
    }

    public function indexFilters(Request $request) {
        $divisionFilters = Division::select($request->type)->distinct()->get();
        if($request->type == 'superior_division_id') {
            foreach ($divisionFilters as $d) {
                $d->superiorDivision;
            }
        }
        return response()->json($divisionFilters, 200);
    }

    public function search(Request $request) {
        $arraySearch = explode(',', $request->value);
        if($request->sort_by && $request->sort_type) {
            $sort_by = $request->sort_by;
            $sort_type = $request->sort_type;
        } else {
            $sort_by = 'name';
            $sort_type = 'asc';
        }
        $skip = ($request->page-1) * $request->size;
        $matchDivisions = Division::where($request->type, 'LIKE', '%'.$request->value.'%')
        ->orderBy($sort_by, $sort_type)
        ->skip($skip)
        ->limit($request->size)
        ->get();
        foreach ($matchDivisions as $d) {
            $d->superiorDivision;
        }
        $count = Division::where($request->type, 'LIKE', '%'.$request->value.'%')->count();
        return response()->json(array(
            'data' => $matchDivisions,
            'total' => $count,), 200);
    }

    public function filterData(Request $request) {
        $arraySearch = explode(',', $request->value);
        if($request->sort_by && $request->sort_type) {
            $sort_by = $request->sort_by;
            $sort_type = $request->sort_type;
        } else {
            $sort_by = 'name';
            $sort_type = 'asc';
        }
        $skip = ($request->page-1) * $request->size;
        $matchDivisions = Division::whereIn($request->type, $arraySearch)
        ->orderBy($sort_by, $sort_type)
        ->skip($skip)
        ->limit($request->size)
        ->get();

        $count = Division::whereIn($request->type, $arraySearch)->count();
        foreach ($matchDivisions as $d) {
            $d->superiorDivision;
        }
        return response()->json(array(
            'data' => $matchDivisions,
            'total' => $count,), 200);
    }
}
