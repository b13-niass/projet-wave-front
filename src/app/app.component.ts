import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalBaseService } from './services/signal-base.service';
import { ClientService } from './services/client.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private signalBaseService: SignalBaseService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.clientService.getGetFrais().subscribe({
      next: (data) => {
        this.signalBaseService.frais.set(data.data.frais);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  ngOnDestroy(): void {}
}
