<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreElectionRequest;
use App\Http\Requests\Admin\UpdateElectionRequest;
use App\Models\Election;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ElectionController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia('Admin/election/CreateElection');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreElectionRequest $request)
    {
        $data = $request->validated();

        // フォームから送信された管理者のIDを選挙のadmin_idに設定する
        $data['admin_id'] = Auth::user()->id;

        Election::create($data);

        return redirect()->route('admin.dashboard');
    }

    /**
     * Display the specified resource.
     */
    public function show(Election $election)
    {
        // ログインしている admin の ID を取得
        $currentAdminId = Auth::id();

        // 選挙の作成者の admin ID を取得
        $electionAdminId = $election->admin_id;
        // dd($election);
        // ログインしている admin の ID と選挙の作成者の admin ID を比較し、一致する場合のみ表示
        if ($currentAdminId === $electionAdminId) {
            return Inertia('Admin/Overview/index', [
                'election' => $election,
                'success' => session('success'),
            ]);
        } else {
            // 一致しない場合は何も表示しないか、適切なエラーメッセージを返すなどの処理を行う
            // 以下は例示的なコードです
            abort(403, 'You are not authorized to view this election.');
        }
    }

    public function launchElection(Election $election)
    {
        if ($election->status != 'Scheduling') {
            $election->update(['status' => 'Scheduling']);
        }

        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateElectionRequest $request, Election $election)
    {
        $data = $request->validated();
        $election->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Election $election)
    {
        try {
            // 外部キー制約を一時的に無効にする
            DB::statement('SET FOREIGN_KEY_CHECKS=0');

            $election->users()->detach();
            $election->candidates()->detach();

            $election->delete();

            // 外部キー制約を再度有効にする
            DB::statement('SET FOREIGN_KEY_CHECKS=1');

            // リダイレクトなど適切な処理を行う
            return redirect()->route('admin.dashboard')->with('success', '選挙が削除されました。');
        } catch (\Exception $e) {
            dd('削除中にエラーが発生しました。エラーメッセージ：' . $e->getMessage());
            return redirect()->back()->with('error', '選挙の削除中にエラーが発生しました。エラーメッセージ：' . $e->getMessage());
        }
    }

    public function updateElectionStatus(Election $election)
    {
        $currentDate = Carbon::now();

        $status = $election->status;
        $startDate = Carbon::parse($election->start_date);
        $endDate = Carbon::parse($election->end_date);

        if ($status === 'Scheduling' && ($currentDate->greaterThanOrEqualTo($startDate) && $endDate->isFuture())) {
            $election->update(['status' => 'Running']);
            // $election->update()が実行された後に$statusを更新する
            $status = 'Running';
        } else if ($status === 'Running' && ($currentDate->greaterThanOrEqualTo($endDate) || $endDate->isPast())) {
            $election->update(['status' => 'Closed']);
            // 同様に$statusを更新する
            $status = 'Closed';
        }
    }
        public function checkValidity($id)
    {
        $election = Election::find($id);

        if (!$election) {
            return response()->json(['isValid' => false], 404);
        }

        $hasCandidates = $election->candidates()->exists();
        $hasVoters = DB::table('candidate_user')->where('election_id', $id)->exists();

        $isValid = $hasCandidates && $hasVoters;

        return response()->json(['isValid' => $isValid]);
    }
}