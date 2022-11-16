export interface ValidationResult {
    row: number;
    description: string;
    severity: "error" | "warning";
}
