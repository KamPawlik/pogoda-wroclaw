import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timer',
})

export class TimerPipe implements PipeTransform {
    transform(value: number) {
        const minutes: number = Math.floor(value / 60000);
        const seconds: number = ((value - minutes * 60000) / 1000);
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }
}