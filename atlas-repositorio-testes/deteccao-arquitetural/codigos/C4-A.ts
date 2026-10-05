type ExportFormat = "text" | "json" | "csv";
type Row = { id: number; label: string };
type Transformation = "trim" | "uppercase" | "mask";

export class RowTransform {
  apply(rows: readonly Row[], transformation: Transformation): Row[] {
    switch (transformation) {
      case "trim": return rows.map((row) => ({ ...row, label: row.label.trim() }));
      case "uppercase": return rows.map((row) => ({ ...row, label: row.label.toUpperCase() }));
      case "mask": return rows.map((row) => ({ ...row, label: "[REDACTED]" }));
    }
  }
}

export class DataExporter {
  encode(rows: readonly Row[], format: ExportFormat): string {
    switch (format) {
      case "text": return rows.map((row) => row.id + ": " + row.label).join("\n");
      case "json": return JSON.stringify(rows);
      case "csv":
        return "id,label\r\n" + rows.map((row) => row.id + ',"' + row.label.replace(/"/g, '""') + '"').join("\r\n");
    }
  }

  contentType(format: ExportFormat): string {
    switch (format) {
      case "text": return "text/plain";
      case "json": return "application/json";
      case "csv": return "text/csv";
    }
  }

  extension(format: ExportFormat): string {
    switch (format) {
      case "text": return ".txt";
      case "json": return ".json";
      case "csv": return ".csv";
    }
  }

  export(rows: readonly Row[], format: ExportFormat) {
    return { body: this.encode(rows, format), type: this.contentType(format), fileName: "report" + this.extension(format) };
  }
}

export function prepareExport(exporter: DataExporter, transform: RowTransform, rows: readonly Row[],
  format: ExportFormat, transformation: Transformation) {
  return exporter.export(transform.apply(rows, transformation), format);
}
