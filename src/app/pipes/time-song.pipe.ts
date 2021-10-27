import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeSong'
})
export class TimeSongPipe implements PipeTransform {

  transform(value: number): string {
    var mins = Math.floor(value / 60);
    var secs = Math.floor(value % 60);
    var result=''
    if(secs<10){
     
    result=mins+':'+String('0'+secs)
    }else{
     result=mins+':'+secs
    };
    return result;
  }

}
