import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetdataService {

  constructor(private http:HttpClient) { }

   getData(){
    return this.http.get('http://localhost:3000/users')
  }
  addData(){
    const data={userId:'61362201a33447ce5da6038a',songId:'61362a73a33447ce5da6038f'}
     this.http.put('http://localhost:3000/song',data,{headers:{'Content-Type': 'application/json'}}).subscribe(data =>{
       console.log(data)
     })
  }
}
