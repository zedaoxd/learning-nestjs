export class FullUserDTO {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly created: Date,
    public readonly updated: Date,
  ) {}
}
