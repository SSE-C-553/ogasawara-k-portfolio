export const normalizeText = (value = "") =>
  String(value).normalize("NFKC").toLocaleLowerCase().trim();

export const searchableText = (...values) =>
  normalizeText(
    values
      .flat(Infinity)
      .filter((value) => value !== null && value !== undefined)
      .join(" "),
  );

export const getYear = (value = "") => {
  const match = String(value).match(/^(\d{4})/);
  return match ? match[1] : "";
};

export const uniqueOptions = (values) =>
  [...new Set(values.filter(Boolean))].sort((a, b) => String(b).localeCompare(String(a)));

export const paginate = (items, requestedPage, perPage = 9) => {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const page = Math.min(Math.max(Number(requestedPage) || 1, 1), totalPages);
  const start = (page - 1) * perPage;

  return {
    items: items.slice(start, start + perPage),
    page,
    totalPages,
  };
};
