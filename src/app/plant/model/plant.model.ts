export class Plant {
  public id: number;
  public common_name: string;
  public scientific_name: string;
  public type: string;
  public maximum_height: number;
  public climate: string;
  public planting_substrate: string;

  constructor(
    id: number,
    common_name: string,
    scientific_name: string,
    type: string,
    maximum_height: number,
    climate: string,
    planting_substrate: string
  ) {
    this.id = id;
    this.common_name = common_name;
    this.scientific_name = scientific_name;
    this.type = type;
    this.maximum_height = maximum_height;
    this.climate = climate;
    this.planting_substrate = planting_substrate;
  }
}
