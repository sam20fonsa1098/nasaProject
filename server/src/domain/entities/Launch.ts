export interface ILaunch {
  mission: string;
  rocket: string;
  launchDate: Date;
  destination: string;
  customers: Array<string>;
  upcoming: boolean;
  flightNumber: number;
  success: boolean;
}

export class Launch {
  private _mission: string;
  private _rocket: string;
  private _launchDate: Date;
  private _destination: string;
  private _customers: Array<string>;
  private _upcoming: boolean;
  private _flightNumber: number;
  private _success: boolean;

  constructor(launch: ILaunch) {
    this._mission = launch.mission;
    this._rocket = launch.rocket;
    this._launchDate = launch.launchDate;
    this._destination = launch.destination;
    this._customers = launch.customers;
    this._upcoming = launch.upcoming;
    this._flightNumber = launch.flightNumber;
    this._success = launch.success;
  }

  public get mission(): string {
    return this._mission;
  }

  public get rocket(): string {
    return this._rocket;
  }

  public get launchDate(): Date {
    return this._launchDate;
  }

  public get destination(): string {
    return this._destination;
  }

  public get customers(): Array<string> {
    return this._customers;
  }

  public get upcoming(): boolean {
    return this._upcoming;
  }

  public get flightNumber(): number {
    return this._flightNumber;
  }

  public get success(): boolean {
    return this._success;
  }

  public toJson(): ILaunch {
    return {
      mission: this._mission,
      rocket: this._rocket,
      launchDate: this._launchDate,
      destination: this._destination,
      customers: this._customers,
      upcoming: this._upcoming,
      flightNumber: this._flightNumber,
      success: this._success,
    };
  }
}
