const toStandardDate = (date: Date) => {
  const formattedDate = date.setHours(12, 0, 0, 0);
  return new Date(formattedDate);
};

const convertTime = (isoDate: string) => {
  const dateObject = new Date(isoDate);
  const date = dateObject.toLocaleDateString("id-ID", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  });
  return `${date} WIB`;
};

const formatDate = (date: Date) => {
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export { toStandardDate, convertTime, formatDate };
