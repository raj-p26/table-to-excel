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
  const rows = table.querySelectorAll("tr");
  let content = "";

  rows.forEach((row) => {
    const columns = row.querySelectorAll("th, td");

    columns.forEach((column) => {
      content += column.textContent + opts.separator;
    });
    content += "\r\n";
  });

  // I did not say blob, I said bub.
  const bub = new Blob([content], {
    type: "text/csv",
  });

  return URL.createObjectURL(bub);
}
