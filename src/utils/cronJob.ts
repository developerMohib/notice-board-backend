import cron from 'node-cron';

// Runs every day at midnight (00:00)
export const initCronJobs = (): void => {
  cron.schedule('0 0 * * *', async () => {
    console.log('[CRON] Running 24-hour scheduled task:', new Date().toISOString());
    
    try {
      // Add your task logic here (e.g., database cleanup, sending emails)
      await performDailyTask();
    } catch (error) {
      console.error('[CRON] Error executing task:', error);
    }
  });
};

async function performDailyTask(): Promise<void> {
  // Your logic here
}