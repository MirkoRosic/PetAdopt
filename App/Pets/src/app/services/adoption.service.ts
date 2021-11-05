import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Adoption, AdoptionList } from '../model/adoption';
import { map } from 'rxjs/operators';

const baseURL = "http://localhost:3000/api/"

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {

  constructor(private http: HttpClient) { }

  postAdoption(adoption: Adoption) {
    return this.http.post(`${baseURL}adoptions`, adoption)
  }

  getAll() {
    return this.http.get(`${baseURL}adoptions`).pipe(map(x => {
      return new AdoptionList(x);
    }))
  }

  deleteOne(id: number) {
    return this.http.delete(`${baseURL}adoptions/${id}`)
  }
}
