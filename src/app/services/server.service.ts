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

    await new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
      try {
        fetch(`${this.backendUrl}/health`, {
        method: 'GET',
        signal: AbortSignal.timeout(50000) // 50 second timeout
      });
      } catch (error: any) {
        // Silently fail — this is just a warm-up call
        console.debug('Server warm-up call did not complete in time', error.message);
      }
    });

    try {
      this.isWarmed = true;
      const response = await fetch(`${this.backendUrl}/health`, {
        method: 'GET',
        signal: AbortSignal.timeout(50000) // 50 second timeout
      });

      if (response.ok) {
        console.log('✅ Server warmed up');
      }
    } catch (error: any) {
      // Silently fail — this is just a warm-up call
      // Don't notify the user or clutter logs
      if (error.name !== 'AbortError') {
        console.debug('Server warm-up call did not complete in time', error.message);
      }
    }
  }
}