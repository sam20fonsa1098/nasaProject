interface IPlanet {
  koi_disposition: string;
  koi_insol: number;
  koi_prad: number;
  kepler_name: string;
}

class Planet {
  private _koi_disposition: string;
  private _koi_insol: number;
  private _koi_prad: number;
  private _kepler_name: string;

  constructor(planet: IPlanet) {
    this._koi_disposition = planet.koi_disposition;
    this._koi_insol = planet.koi_insol;
    this._koi_prad = planet.koi_prad;
    this._kepler_name = planet.kepler_name;
  }

  public get koi_disposition(): string {
    return this._koi_disposition;
  }

  public get koi_insol(): number {
    return this._koi_insol;
  }

  public get koi_prad(): number {
    return this._koi_prad;
  }

  public get kepler_name(): string {
    return this._kepler_name;
  }

  public get isHabitable(): boolean {
    return (
      this.koi_disposition === 'CONFIRMED' &&
      this.koi_insol > 0.36 &&
      this.koi_insol < 1.11
    );
  }

  public toJson(): IPlanet {
    return {
      koi_disposition: this._koi_disposition,
      koi_insol: this._koi_insol,
      koi_prad: this._koi_prad,
      kepler_name: this._kepler_name,
    };
  }
}

export { Planet, IPlanet };
