/**
 * Converts given HTML table to the CSV file.
 * @param {HTMLTableElement} table Target table to extract data.
 * @param {{ separator: string; fileName: string; }} [opts] Config options for csv
 * @returns object URL of created CSV file
 */
function convertToCSV(
  table,
  opts = {
    separator: ",",
  }
) {
  if (!(table instanceof HTMLTableElement))
    throw new Error(`table ain't Table. How the turn-tables.`);

  const rows = table.querySelectorAll("tr");
  let content = "";

  rows.forEach((row) => {
    const columns = row.querySelectorAll("th, td");

    columns.forEach((column) => {
      const text = column.textContent.replace(",", "");
      content += text + opts.separator;
    });
    content += "\r\n";
  });

  // I did not say blob, I said bub.
  const bub = new Blob([content], {
    type: "text/csv",
  });

  return URL.createObjectURL(bub);
}
