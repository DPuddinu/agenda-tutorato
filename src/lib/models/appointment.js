export class Appointment {
  constructor(
    id,
    userId,
    description,
    creationDate,
    updateDate,
    completionDate,
    dueDate,
    category
  ) {
    this.id = id;
    this.userId = userId;
    this.description = description;
    this.creationDate = creationDate;
    this.updateDate = updateDate;
    this.completionDate = completionDate;
    this.dueDate = dueDate;
    this.category = category;
  }
}
