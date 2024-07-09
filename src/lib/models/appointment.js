export class Appointment {
  id;
  userId;
  description;
  creationDate;
  updateDate;
  completionDate;
  dueDate;
  category;
  constructor(appointment) {
    Object.assign(this, appointment);
  }

  getId() {
    return this.id;
  }
  setId(id) {
    this.id = id;
  }

  getUserId() {
    return this.userId;
  }
  setUserId(userId) {
    this.userId = userId;
  }

  getDescription() {
    return this.description;
  }
  setDescription(description) {
    this.description = description;
  }

  getCreationDate() {
    return this.creationDate;
  }
  setCreationDate(creationDate) {
    this.creationDate = creationDate;
  }

  getUpdateDate() {
    return this.updateDate;
  }
  setUpdateDate(updateDate) {
    this.updateDate = updateDate;
  }

  getCompletionDate() {
    return this.completionDate;
  }
  setCompletionDate(completionDate) {
    this.completionDate = this.completionDate;
  }

  getDueDate() {
    return this.dueDate;
  }
  setDueDate(dueDate) {
    this.dueDate = dueDate;
  }

  getCategory() {
    return this.category;
  }
  setCategory(category) {
    this.category = category;
  }
}
