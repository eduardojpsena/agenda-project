import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contato } from './contato/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  url: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { };

  salvar( contato: Contato ): Observable<Contato> {
    return this.http.post<Contato>(this.url, contato);
  };

  listar(  ): Observable<Contato[]> {
    return this.http.get<any>(this.url);
  };
  
}
