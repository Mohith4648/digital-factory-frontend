import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  logs: any[] = [];
  // This points to the remote server you are working on
  private backendUrl = 'http://192.168.1.31:8000/dashboard-data';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
    // Refresh the dashboard every 5 seconds automatically
    setInterval(() => this.fetchData(), 5000);
  }

  fetchData() {
    this.http.get<any[]>(this.backendUrl).subscribe({
      next: (data) => this.logs = data,
      error: (err) => console.error('Backend at 192.168.1.31 is unreachable')
    });
  }
}