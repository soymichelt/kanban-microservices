import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { ArgRequiredException } from '@shared/domain/exceptions/argRequiredException';
import { SmsSendProps, SmsService } from '@shared/domain/services/smsService';

type SnsSmsServiceProps = {
  awsRegion: string;
  sender: string;
};

export class SnsSmsService implements SmsService {
  private awsRegion: string;
  private sender: string;

  constructor(props: SnsSmsServiceProps) {
    this.validateSmsService(props);

    this.awsRegion = props.awsRegion;
    this.sender = props.sender;
  }

  public async send(props: SmsSendProps): Promise<void> {
    const smsParams = {
      PhoneNumber: props.phoneNumber,
      Message: props.message,
      MessageAttributes: {
        'AWS.SNS.SMS.SenderID': {
          DataType: 'String',
          StringValue: this.sender,
        },
      },
    };

    const client = new SNSClient({ region: this.awsRegion });
    const command = new PublishCommand(smsParams);
    await client.send(command);
  }

  private validateSmsService(props: SnsSmsServiceProps): void {
    if (!props.awsRegion || !props.sender) {
      throw new ArgRequiredException(
        Object.entries(props)
          .filter(([_, value]) => !value)
          .map(([key]) => key),
      );
    }
  }
}
