import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import type { Member } from '../_models/member';
import type { PaginatedResult } from '../_models/pagination';
import { setPaginatedResponse, setPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class VisitsService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  visitIds = signal<number[]>([]);
  paginatedResult = signal<PaginatedResult<Member[]> | null>(null);

  toggleVisit(targetId: number) {
    return this.http.post(`${this.baseUrl}visits/${targetId}`, {})
  }
  
  getVisits(predicate: string, pageNumber: number, pageSize: number) {
    let params = setPaginationHeaders(pageNumber, pageSize);

    params = params.append('predicate', predicate);

    return this.http.get<Member[]>(`${this.baseUrl}visits`,
      {observe: 'response', params}).subscribe({
        next: response => setPaginatedResponse(response, this.paginatedResult)
      })
  }

  getVisitIds() {
    return this.http.get<number[]>(`${this.baseUrl}visits/visit`).subscribe({
      next: ids => this.visitIds.set(ids)
    })
  }
}