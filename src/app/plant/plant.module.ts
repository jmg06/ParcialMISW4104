import { NgModule } from '@angular/core';

import { PlantListComponent } from './components/plant-list/plant-list.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  exports: [PlantListComponent],
  declarations: [PlantListComponent],
  providers: [],
})
export class PlantModule {}
