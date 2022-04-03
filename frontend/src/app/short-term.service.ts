import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShortTermService {
  

  constructor(private http:HttpClient) { }

  getGoals(){
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    return this.http.get('http://localhost:3500/getGoals',{ headers: header });
  }
}
