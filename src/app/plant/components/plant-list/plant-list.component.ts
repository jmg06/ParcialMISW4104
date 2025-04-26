import { Component, OnInit } from '@angular/core';

import { Plant } from '../../model/plant.model';
import { PlantaService } from '../../services/plant.service';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  standalone: false,
})
export class PlantListComponent implements OnInit {
  public plants: Plant[] = [];

  constructor(private plantService: PlantaService) {}

  ngOnInit() {
    this.getPlants();
  }

  public get totalForeignPlants(): number {
    let total = 0;

    this.plants.forEach((plant) => {
      if (plant.type === 'Exterior') total++;
    });

    return total;
  }

  public get totalNativePlants(): number {
    let total = 0;

    this.plants.forEach((plant) => {
      if (plant.type === 'Interior') total++;
    });

    return total;
  }

  public getPlants(): void {
    this.plantService.getPlants().subscribe((plants) => (this.plants = plants));
  }
}
