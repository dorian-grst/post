import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) return '';

    const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
    if (seconds < 60) return 'Just now';

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (const [key, secondsInInterval] of Object.entries(intervals)) {
      const counter = Math.floor(seconds / secondsInInterval);
      if (counter > 0) {
        return `${counter} ${key}${counter !== 1 ? 's' : ''} ago`;
      }
    }

    return value;
  }
}
