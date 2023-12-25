import { GetParametersCommand, SSMClient } from '@aws-sdk/client-ssm';
import { KeyStoreService } from '@shared/domain/services/keyStoreService';

type SsmKeyStoreServiceProps = {
  awsRegion: string;
};

export class SsmKeyStoreService implements KeyStoreService {
  private awsRegion: string;

  constructor(props: SsmKeyStoreServiceProps) {
    this.awsRegion = props.awsRegion;
  }

  public async get(keys: string[]): Promise<string[]> {
    const client = new SSMClient({ region: this.awsRegion });
    const command = new GetParametersCommand({
      Names: keys,
      WithDecryption: true,
    });

    const params = await client.send(command);
    const result = params.Parameters?.filter((param) => !!param && !!param?.Value).map((param) => param.Value) || [];

    return result;
  }
}
