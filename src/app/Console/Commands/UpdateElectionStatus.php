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
        $currentDate = Carbon::now();

        Election::all()->each(function ($election) use ($currentDate) {
            $status = $election->status;
            $startDate = Carbon::parse($election->start_date);
            $endDate = Carbon::parse($election->end_date);
            
            if ($status === 'scheduling' && ($currentDate->greaterThanOrEqualTo($startDate) || $startDate->isPast())) {
                $election->update(['status' => 'running']);
            
            } elseif ($status === 'running' && ($currentDate->greaterThanOrEqualTo($endDate) || $endDate->isPast())) {
                $election->update(['status' => 'closed']);
            }
          
            
        });

        $this->info('Election statuses updated successfully.');
    }
}
