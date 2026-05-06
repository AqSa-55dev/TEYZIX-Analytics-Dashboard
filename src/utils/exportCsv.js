// src/utils/exportCsv.js
// Converts an array of objects to a CSV file and triggers a browser download.

export function exportToCsv(filename, rows) {
  if (!rows || rows.length === 0) return;

  const headers = Object.keys(rows[0]);
  const csvRows = [
    headers.join(','),
    ...rows.map((row) =>
      headers
        .map((h) => {
          const val = row[h] ?? '';
          // Wrap in quotes if value contains comma / newline / quote
          return /[",\n]/.test(String(val))
            ? `"${String(val).replace(/"/g, '""')}"`
            : String(val);
        })
        .join(',')
    ),
  ];

  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href     = url;
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
