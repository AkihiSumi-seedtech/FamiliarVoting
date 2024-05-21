<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Election;
use Carbon\Carbon;

class UpdateElectionStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'election:update-status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update election status command';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // 現在の日時を取得
        $currentDate = Carbon::now();

        // 全ての選挙を取得して処理
        Election::all()->each(function ($election) use ($currentDate) {
            $status = $election->status;
            $startDate = Carbon::parse($election->start_date);
            $endDate = Carbon::parse($election->end_date);
            
            if ($status === 'scheduling' && ($currentDate->greaterThanOrEqualTo($startDate) || $startDate->isPast())) {
                // 現在の日時が開始日以降の場合、状態をrunningに更新
                $election->update(['status' => 'running']);
            } elseif ($status === 'running' && ($currentDate->greaterThanOrEqualTo($endDate) || $endDate->isPast())) {
                // 現在の日時が終了日以降の場合、状態をclosedに更新
                $election->update(['status' => 'closed']);
            }
            
        });

        $this->info('Election statuses updated successfully.');
    }
}
