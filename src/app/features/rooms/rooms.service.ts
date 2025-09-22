import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Room } from './rooms.model';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) { }

  getRooms(status? :any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/rooms/${status}`);
  }

  createRooms(rooms: Room[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/rooms`, rooms);
  }

  updateRoom(room: Room): Observable<any> {
    return this.http.put(`${this.apiUrl}/rooms/${room.id}`, room);
  }

  deleteRoom(id: number) {
    return this.http.delete(`${this.apiUrl}/rooms/${id}`);
  }

}
