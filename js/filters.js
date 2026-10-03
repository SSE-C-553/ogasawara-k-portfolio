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

export const getYears = (value = "") => {
  const years = String(value).match(/\b\d{4}\b/g) || [];
  if (!years.length) return [];
  const start = Number(years[0]);
  const end = Number(years[1] || start);
  if (end < start || end - start > 100) return [String(start)];
  return Array.from({ length: end - start + 1 }, (_, index) => String(start + index));
};

export const matchesYear = (value, year) => !year || getYears(value).includes(String(year));
export const paginate = (items, requestedPage, perPage = 9) => {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const requested = Number(requestedPage);
  const page = Math.min(Math.max(Number.isFinite(requested) ? Math.floor(requested) : 1, 1), totalPages);
  const start = (page - 1) * perPage;

  return {
    items: items.slice(start, start + perPage),
    page,
    totalPages,
  };
};
