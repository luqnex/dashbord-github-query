export const mountDate = (date: Date) => {
  if (date) {
    const dateFormatted = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
    return dateFormatted;
  }
};
