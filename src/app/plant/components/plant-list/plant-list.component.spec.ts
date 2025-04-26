import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { faker } from '@faker-js/faker';

import { Plant } from '../../model/plant.model';
import { PlantListComponent } from './plant-list.component';
import { PlantaService } from '../../services/plant.service';

describe('PlantListComponent', () => {
  let component: PlantListComponent;
  let fixture: ComponentFixture<PlantListComponent>;
  let plantService: jasmine.SpyObj<PlantaService>;

  const mockPlants: Plant[] = [
    new Plant(
      1,
      faker.lorem.word(),
      faker.science.chemicalElement().name,
      'Interior',
      faker.number.int(),
      faker.lorem.word(),
      faker.lorem.word()
    ),
    new Plant(
      2,
      faker.lorem.word(),
      faker.science.chemicalElement().name,
      'Exterior',
      faker.number.int(),
      faker.lorem.word(),
      faker.lorem.word()
    ),
    new Plant(
      3,
      faker.lorem.word(),
      faker.science.chemicalElement().name,
      'Interior',
      faker.number.int(),
      faker.lorem.word(),
      faker.lorem.word()
    ),
    new Plant(
      4,
      faker.lorem.word(),
      faker.science.chemicalElement().name,
      'Exterior',
      faker.number.int(),
      faker.lorem.word(),
      faker.lorem.word()
    ),
  ];

  beforeEach(() => {
    const plantServiceSpy = jasmine.createSpyObj('PlantaService', [
      'getPlants',
    ]);
    TestBed.configureTestingModule({
      declarations: [PlantListComponent],
      providers: [{ provide: PlantaService, useValue: plantServiceSpy }],
    });
    fixture = TestBed.createComponent(PlantListComponent);
    component = fixture.componentInstance;
    plantService = TestBed.inject(
      PlantaService
    ) as jasmine.SpyObj<PlantaService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPlants on ngOnInit', () => {
    plantService.getPlants.and.returnValue(of(mockPlants));
    component.ngOnInit();
    expect(plantService.getPlants).toHaveBeenCalledTimes(1);
    expect(component.plants).toEqual(mockPlants);
  });

  it('should calculate totalNativePlants correctly', () => {
    component.plants = mockPlants;
    expect(component.totalNativePlants).toBe(2);
  });

  it('should calculate totalForeignPlants correctly', () => {
    component.plants = mockPlants;
    expect(component.totalForeignPlants).toBe(2);
  });

  it('should render the plant list in the template', () => {
    plantService.getPlants.and.returnValue(of(mockPlants));
    fixture.detectChanges();
    const tableRows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(tableRows.length).toBe(mockPlants.length);
    tableRows.forEach((row: any, index: number) => {
      const cells = row.querySelectorAll('td');
      expect(row.querySelector('th')?.textContent).toContain(
        mockPlants[index].id.toString()
      );
      expect(cells[0]?.textContent).toContain(mockPlants[index].common_name);
      expect(cells[1]?.textContent).toContain(mockPlants[index].type);
      expect(cells[2]?.textContent).toContain(mockPlants[index].climate);
    });
  });

  it('should render the total native and foreign plant counts', () => {
    plantService.getPlants.and.returnValue(of(mockPlants));
    fixture.detectChanges();
    const nativePlantCountSpan =
      fixture.nativeElement.querySelector('span:nth-child(2)');
    const foreignPlantCountSpan =
      fixture.nativeElement.querySelector('span:nth-child(3)');
    expect(nativePlantCountSpan?.textContent).toContain(
      `Total plantas del interior: ${component.totalNativePlants}`
    );
    expect(foreignPlantCountSpan?.textContent).toContain(
      `Total plantas del exterior: ${component.totalForeignPlants}`
    );
  });
});
