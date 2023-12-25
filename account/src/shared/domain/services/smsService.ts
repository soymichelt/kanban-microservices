export type SmsSendProps = {
  phoneNumber: string;
  message: string;
};

export interface SmsService {
  send(props: SmsSendProps): Promise<void>;
}
