import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PetsList } from './model/petsList.model';
import { map } from 'rxjs/operators';
import { Pet } from './model/pet.model';
import { Adoption, AdoptionList } from './model/adoption.model';

const baseURL = 'http://localhost:3000/api/pets';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  constructor(private http: HttpClient) {}

  getPets(params?: any): Observable<PetsList> {
    let queryParams = {};

    if (params) {
      queryParams = {
        params: new HttpParams()
          .set('filter', (params.filter && JSON.stringify(params.filter)) || '')
          .set('sort', params.sort || ''),
      };
    }

    return this.http.get(baseURL, queryParams).pipe(
      map((x: any) => {
        return new PetsList(x);
      })
    );
  }

  getOnePet(id: number): Observable<Pet> {
    return this.http.get(`${baseURL}/${id}`).pipe(
      map((x: any) => {
        return new Pet(x);
      })
    );
  }

  postAdoption(adoption: Adoption): Observable<Adoption> {
    return this.http.post(`http://localhost:3000/api/adoptions`, adoption).pipe(
      map((x: any) => {
        return new Adoption(x);
      })
    );
  }

  getAdoptions(): Observable<AdoptionList> {
    return this.http.get('http://localhost:3000/api/adoptions').pipe(
      map((x: any) => {
        return new AdoptionList(x);
      })
    );
  }

  deleteAdoption(id: number): Observable<Adoption> {
    return this.http.delete(`http://localhost:3000/api/adoptions/${id}`).pipe(
      map((x: any) => {
        return new Adoption(x);
      })
    );
  }
}
