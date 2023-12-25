import { ArgRequiredException } from '@shared/domain/exceptions/argRequiredException';
import { MailingService, SendEmailProps } from '@shared/domain/services/mailingService';
import { Resend } from 'resend';

type ResendMailingServiceProps = {
  apiKey: string;
  emailFrom: string;
};

export class ResendMailingService implements MailingService {
  private readonly apiKey: string;
  private readonly emailFrom: string;

  constructor(props: ResendMailingServiceProps) {
    this.validateSmsService(props);

    this.apiKey = props.apiKey;
    this.emailFrom = props.emailFrom;
  }

  public async send(props: SendEmailProps): Promise<void> {
    const resend = new Resend(this.apiKey);

    await resend.emails.send({
      from: this.emailFrom,
      to: props.to,
      subject: props.subject,
      html: props.message,
    });
  }

  private validateSmsService(props: ResendMailingServiceProps): void {
    if (!props.apiKey || !props.emailFrom) {
      throw new ArgRequiredException(
        Object.entries(props)
          .filter(([_, value]) => !value)
          .map(([key]) => key),
      );
    }
  }
}
