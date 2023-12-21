import { ArgRequiredException } from '@shared/domain/exceptions/argRequiredException';
import { Logger } from '@shared/domain/loggers/logger';
import { createLogger, format, Logger as LoggerOfWinston, transports } from 'winston';

type WinstonLoggerMetadataProps = {
  app: string;
  service: string;
  package: string;
  awsRegion: string;
  stage: string;
  version: string;
};

export class WinstonLogger implements Logger {
  private readonly logger: LoggerOfWinston;
  private readonly metadata: WinstonLoggerMetadataProps;

  constructor(metadata: WinstonLoggerMetadataProps) {
    this.validateLogger(metadata);

    this.metadata = metadata;

    this.logger = createLogger({
      level: 'info',
      format: format.json(),
      transports: [new transports.Console()],
      defaultMeta: { ...this.metadata },
    });
  }

  public debug(message: string | Record<string, unknown>): void {
    this.logger.debug(this.parseMessageToString(message));
  }

  public info(message: string | Record<string, unknown>): void {
    this.logger.info(this.parseMessageToString(message));
  }

  public error(message: string | Record<string, unknown>): void {
    this.logger.error(this.parseMessageToString(message));
  }

  public warn(message: string | Record<string, unknown>): void {
    this.logger.warn(this.parseMessageToString(message));
  }

  private validateLogger(metadata: WinstonLoggerMetadataProps): void {
    if (!metadata.app || !metadata.service || !metadata.package || !metadata.stage || !metadata.version) {
      throw new ArgRequiredException(
        Object.entries(metadata)
          .filter(([_, value]) => !value)
          .map(([key]) => key),
      );
    }
  }

  private parseMessageToString(message: string | Record<string, unknown>): string {
    try {
      return JSON.stringify(message);
    } catch (error) {
      return String(message);
    }
  }
}
