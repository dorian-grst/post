export class Thread {
  constructor(
    public id: string,
    public name: string,
    public created: Date,
    public updated: Date,
    public postCount: number
  ) {}
}
