export class Place {
  constructor(
    public id: string,
    public title: string,
    public imageUri: string,
    public address: string,
    public lat: number,
    public lng: number
  ) {}
}
