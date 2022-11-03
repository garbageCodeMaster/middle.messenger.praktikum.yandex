const enum Time {
    Year = 31536000,
    Month = 2592000,
    Day = 86400,
    Hour = 3600,
    Minute = 60,
}

export function formatDate(date: Date) {
    const seconds = Math.floor((Number(new Date()) - Number(date)) / 1000);

    let interval = seconds / Time.Year;
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }

    interval = seconds / Time.Month;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }

    interval = seconds / Time.Day;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }

    interval = seconds / Time.Hour;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }

    interval = seconds / Time.Minute;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }

    return Math.floor(seconds) + " seconds";
}
