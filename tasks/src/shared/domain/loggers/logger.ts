export interface Logger {
  debug(message: Record<string, unknown> | string): void;
  info(message: Record<string, unknown> | string): void;
  error(message: Record<string, unknown> | string): void;
  warn(message: Record<string, unknown> | string): void;
}
