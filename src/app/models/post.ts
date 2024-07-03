export class Post {
  constructor(
    public id: string,
    public title: string,
    public content: string,
    public authorId: string,
    public threadId: string,
    public created: Date,
    public updated: Date
  ) {}
}
