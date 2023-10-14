export const timeAgo = (date: Date) => {
  const timestamp = new Date().valueOf();

  const seconds = Math.floor((timestamp - date.valueOf()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " tahun yang lalu";
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " bulan yang lalu";
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " hari yang lalu";
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " jam yang lalu";
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " menit yang lalu";
  }

  if (seconds < 10) return "Baru saja";

  return Math.floor(seconds) + " detik yang lalu";
};
