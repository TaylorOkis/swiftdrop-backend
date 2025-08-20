export default function excludePassword<T extends { password: string }>(
  data: T
) {
  const { password, ...filteredData } = data;
  return filteredData;
}
