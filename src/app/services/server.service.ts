import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private readonly backendUrl = 'https://snorf-zone-backend.onrender.com';
  private isWarmed = false;

  /**
   * Pings the server health endpoint to warm up the free-tier instance.
   * Should be called as soon as the user interacts with the app.
   * Silently fails if the call doesn't complete — this is best-effort.
   */
  async warmUpServer(): Promise<void> {
    // Only warm up once per session
    if (this.isWarmed) {
      return;
    }

    this.isWarmed = true;
    void this.triggerWarmUp();
  }

  private async triggerWarmUp(): Promise<void> {
    try {
      const response = await fetch(`${this.backendUrl}/health`, {
        method: 'GET',
        signal: AbortSignal.timeout(50000) // 50 second timeout
      });

      if (response.ok) {
        console.log('✅ Server warmed up');
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.debug('Server warm-up call did not complete in time', error.message);
      }
    }
  }
}