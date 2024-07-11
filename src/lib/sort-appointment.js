export function sortAppointmentsByCreationDate(appointments, isAscending) {
  if (isAscending) {
    return appointments.sort(
      (a, b) => a.creationDate.getTime() - b.creationDate.getTime()
    );
  } else {
    return appointments.sort(
      (a, b) => b.creationDate.getTime() - a.creationDate.getTime()
    );
  }
}

export function sortAppointmentsByCategory(appointments, isAscending) {
  if (isAscending) {
    return appointments.sort(function (a, b) {
      if (a.category < b.category) {
        return -1;
      }
      if (b.category < a.category) {
        return 1;
      }
      return 0;
    });
  } else {
    return appointments.sort(function (a, b) {
      if (a.category > b.category) {
        return -1;
      }
      if (b.category > b.category) {
        return 1;
      }
      return 0;
    });
  }
}