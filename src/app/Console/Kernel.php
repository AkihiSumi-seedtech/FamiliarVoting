<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule)
    {
        // 開始日が過ぎた選挙のステータスを更新
        $schedule->call(function () {
            \App\Models\Election::where('status', 'building')
                ->where('start_date', '<=', now())
                ->update(['status' => 'running']);
        })->everyMinute(); // 1分ごとに実行する例

        // 終了日が過ぎた選挙のステータスを更新
        $schedule->call(function () {
            \App\Models\Election::where('status', 'running')
                ->where('end_date', '<=', now())
                ->update(['status' => 'closed']);
        })->daily(); // 1分ごとに実行する例
    }


    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}