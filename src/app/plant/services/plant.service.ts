import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, type Observable } from 'rxjs';

import type { Plant } from '../model/plant.model';
import type { PlantResponse } from '../interfaces/plant.interface';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PlantaService {
  constructor(private http: HttpClient) {}

  public getPlants(): Observable<Plant[]> {
    return this.http.get<PlantResponse[]>(environment.apiUrl).pipe(
      map((plants) =>
        plants.map((plant) => ({
          id: plant.id,
          common_name: plant.nombre_comun,
          scientific_name: plant.nombre_cientifico,
          type: plant.tipo,
          maximum_height: plant.altura_maxima,
          climate: plant.clima,
          planting_substrate: plant.sustrato_siembra,
        }))
      )
    );
  }
}
