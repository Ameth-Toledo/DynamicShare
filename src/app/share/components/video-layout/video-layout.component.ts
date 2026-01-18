import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-layout.component.html',
  styleUrl: './video-layout.component.css'
})
export class VideoLayoutComponent implements AfterViewInit {
@ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  
  isPlaying = false;
  isMuted = false;
  progress = 0;
  currentTime = '0:00';
  duration = '0:00';

  ngAfterViewInit() {
    const video = this.videoPlayer.nativeElement;
    
    video.addEventListener('loadedmetadata', () => {
      this.duration = this.formatTime(video.duration);
    });
    
    video.addEventListener('timeupdate', () => {
      this.progress = (video.currentTime / video.duration) * 100;
      this.currentTime = this.formatTime(video.currentTime);
    });
    
    video.addEventListener('ended', () => {
      this.isPlaying = false;
    });
  }

  togglePlay() {
    const video = this.videoPlayer.nativeElement;
    if (video.paused) {
      video.play();
      this.isPlaying = true;
    } else {
      video.pause();
      this.isPlaying = false;
    }
  }

  toggleMute() {
    const video = this.videoPlayer.nativeElement;
    video.muted = !video.muted;
    this.isMuted = video.muted;
  }

  seek(event: MouseEvent) {
    const progressContainer = event.currentTarget as HTMLElement;
    const video = this.videoPlayer.nativeElement;
    const rect = progressContainer.getBoundingClientRect();
    const pos = (event.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  }

  toggleFullscreen() {
    const container = this.videoPlayer.nativeElement.parentElement;
    if (!document.fullscreenElement) {
      container?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}