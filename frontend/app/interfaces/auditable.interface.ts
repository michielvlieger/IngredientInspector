/**
 * Unix timestamps.
 * It is not possible to provide a default column value with WatermelonDB.
 * Unix timestamps are automatically converted back to Dates if the \@date\ decorator is applied instead of \@field\ in the model files.
 */

export interface AuditableInterface {
  createdAt: number;
  updatedAt: number;
}
