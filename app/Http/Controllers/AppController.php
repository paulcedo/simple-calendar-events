<?php

namespace App\Http\Controllers;

use App\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AppController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'event_name' => 'required|string',
            'reserved_dates' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        if(count(Event::where('event_name',$request->event_name)->get())>=1){
            // dd(is_array($request->reserved_dates) || is_object($request->reserved_dates));
            // Event::where('event_name', $request->event_name)->updateOrCreate($r);
            Event::where('event_name', $request->event_name)->delete();
            foreach ((array)$request->reserved_dates as $value) {
                Event::updateOrCreate([
                    'event_name'=>$request->event_name,
                    'reserved_date'=> $value
                ]);
            }
        }else{
            if (is_array($request->reserved_dates) || is_object($request->reserved_dates)) {
                foreach ($request->reserved_dates as $value) {
                    Event::create([
                        'event_name' => $request->event_name,
                        'reserved_date' => $value
                    ]);
                }
            }
        }


        return response()->json(['status_code'=>200,'status_message'=>'success']);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function getAll()
    {
        return response()->json(['data'=>Event::orderBy('reserved_date')->get()]);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function getAllDates()
    {
        return response()->json(['data'=>Event::select('reserved_date')->get()]);
    }
}
