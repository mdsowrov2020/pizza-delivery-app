export const formatCurrency = (value) => {
  const formattedCurrency = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "BDT",
  }).format(value);

  return formattedCurrency;
};
export const formatDate = (dateStr) => {
  const formattedDate = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));

  return formattedDate;
};

export const calcMiniuteLeft = (dateStr) => {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round(d1 - d2) / 60000;
};
