type ExportFormat = "text" | "json" | "csv";
type Row = { id: number; label: string };
type Transformation = "trim" | "uppercase" | "mask";
type OrderKey = "id" | "label" | "labelLength";
type OrderDirection = "ascending" | "descending";

export class RowTransform {
  isSupported(transformation: string): transformation is Transformation {
    switch (transformation) {
      case "trim": return true;
      case "uppercase": return true;
      case "mask": return true;
      default: return false;
    }
  }

  apply(rows: readonly Row[], transformation: Transformation): Row[] {
    switch (transformation) {
      case "trim": return rows.map((row) => ({ ...row, label: row.label.trim() }));
      case "uppercase": return rows.map((row) => ({ ...row, label: row.label.toUpperCase() }));
      case "mask": return rows.map((row) => ({ ...row, label: "[REDACTED]" }));
    }
  }
}

export class RowOrdering {
  idAscending(rows: readonly Row[]): Row[] { return [...rows].sort((a, b) => a.id - b.id); }
  idDescending(rows: readonly Row[]): Row[] { return [...rows].sort((a, b) => b.id - a.id); }
  labelAscending(rows: readonly Row[]): Row[] { return [...rows].sort((a, b) => a.label.localeCompare(b.label)); }
  labelDescending(rows: readonly Row[]): Row[] { return [...rows].sort((a, b) => b.label.localeCompare(a.label)); }
  labelLengthAscending(rows: readonly Row[]): Row[] { return [...rows].sort((a, b) => a.label.length - b.label.length); }
  labelLengthDescending(rows: readonly Row[]): Row[] { return [...rows].sort((a, b) => b.label.length - a.label.length); }

  order(rows: readonly Row[], key: OrderKey, direction: OrderDirection): Row[] {
    switch (key) {
      case "id": return direction === "ascending" ? this.idAscending(rows) : this.idDescending(rows);
      case "label": return direction === "ascending" ? this.labelAscending(rows) : this.labelDescending(rows);
      case "labelLength":
        return direction === "ascending" ? this.labelLengthAscending(rows) : this.labelLengthDescending(rows);
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

export function prepareExport(exporter: DataExporter, transform: RowTransform, ordering: RowOrdering,
  rows: readonly Row[], format: ExportFormat, transformation: string, key: OrderKey, direction: OrderDirection) {
  if (!transform.isSupported(transformation)) throw new Error("Unsupported transformation");
  const transformed = transform.apply(rows, transformation);
  return exporter.export(ordering.order(transformed, key, direction), format);
}
