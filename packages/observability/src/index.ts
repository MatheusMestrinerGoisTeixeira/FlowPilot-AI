export interface LogContext {
  tenantId?: string;
  userId?: string;
  leadId?: string;
  requestId?: string;
}

export interface AppLogger {
  info(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(message: string, context?: LogContext & { error?: unknown }): void;
}

export const logger: AppLogger = {
  info(message, context) {
    console.info(JSON.stringify({ level: "info", message, context, timestamp: new Date().toISOString() }));
  },
  warn(message, context) {
    console.warn(JSON.stringify({ level: "warn", message, context, timestamp: new Date().toISOString() }));
  },
  error(message, context) {
    console.error(JSON.stringify({ level: "error", message, context, timestamp: new Date().toISOString() }));
  },
};
