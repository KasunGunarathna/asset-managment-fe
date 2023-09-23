export const generateCsvData = (columns: any, data: any) => {
  const header = columns.map((column: any) => column.label).join(",");
  const rows = data.map((bridge: any) =>
    columns.map((column: any) => bridge[column.id] || "").join(",")
  );
  return [header, ...rows].join("\n");
};
