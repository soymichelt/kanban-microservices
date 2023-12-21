import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { ArgRequiredException } from '@shared/domain/exceptions/argRequiredException';
import { MailingService, SendEmailProps } from '@shared/domain/services/mailingService';

type SesMailingServiceProps = {
  awsRegion: string;
  emailFrom: string;
};

export class SesMailingService implements MailingService {
  private readonly awsRegion: string;
  private readonly emailFrom: string;

  constructor(props: SesMailingServiceProps) {
    this.validateSmsService(props);

    this.awsRegion = props.awsRegion;
    this.emailFrom = props.emailFrom;
  }

  public async send(props: SendEmailProps): Promise<void> {
    const sesParams = {
      Source: this.emailFrom,
      Destination: {
        ToAddresses: [props.to],
      },
      Message: {
        Subject: {
          Data: props.subject,
        },
        Body: {
          Html: {
            Data: props.message,
          },
        },
      },
    };

    const client = new SESClient({ region: this.awsRegion });
    const command = new SendEmailCommand(sesParams);
    await client.send(command);
  }

  private validateSmsService(props: SesMailingServiceProps): void {
    if (!props.awsRegion || !props.emailFrom) {
      throw new ArgRequiredException(
        Object.entries(props)
          .filter(([_, value]) => !value)
          .map(([key]) => key),
      );
    }
  }
}
