import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contato } from './contato/contato';
import { PaginaContato } from './contato/paginaContato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  url: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { };

  salvar(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.url, contato);
  };

  listar(page, size): Observable<PaginaContato> {
    return this.http.get<any>(`${this.url}?page=${page}&size=${size}`);
  };

  favorito(contato: Contato): Observable<any> {
    return this.http.patch(`${this.url}/${contato.id}/favorito`, null);
  };

  upload(contato: Contato, formData: FormData): Observable<any> {
    return this.http.put(`${this.url}/${contato.id}/foto`, formData, {responseType: 'blob'});
  };
}
