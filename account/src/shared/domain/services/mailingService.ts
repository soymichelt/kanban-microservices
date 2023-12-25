export type SendEmailProps = {
  to: string;
  subject: string;
  message: string;
};

export interface MailingService {
  send(props: SendEmailProps): Promise<void>;
}
