import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [CommonModule, ZXingScannerModule],
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.css',
})
export class QrCodeComponent {
  @Output() close = new EventEmitter<void>();
  @Output() scanComplete = new EventEmitter<string>();

  availableDevices: MediaDeviceInfo[] = [];
  selectedDevice?: MediaDeviceInfo = undefined;
  lastResult?: string;

  allowedFormats = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.EAN_13,
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
  ];

  onDeviceSelectChange(event: Event): void {
    const deviceId = (event.target as HTMLSelectElement).value;
    this.selectedDevice = this.availableDevices.find(
      (d) => d.deviceId === deviceId
    );
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    console.log(devices);

    const rearCamera = devices.find((device) =>
      /back|rear|environment/gi.test(device.label)
    );
    this.selectedDevice = rearCamera || devices[0];
  }

  onPermissionResponse(granted: boolean): void {
    if (!granted) {
      console.error('Permission de caméra refusée');
    }
  }

  onScanSuccess(result: string): void {
    this.lastResult = result;
    this.scanComplete.emit(result);

    setTimeout(() => this.close.emit(), 1000);
  }

  onScanError(error: Error): void {
    console.error('Erreur de scan:', error);
    this.lastResult = `Erreur: ${error.message}`;
  }
}
