import { ConfigService } from '@nestjs/config';
import { StoreProxyService } from '@shared/clients/store/store-proxy-service';

export class StorePrivate extends StoreProxyService {
  constructor(config: ConfigService) {
    const {
      accessKeyId = '',
      secretAccessKey = '',
      region = '',
      bucket = '',
      folder = '',
    } = config.get('aws_s3') || {};
    super({ accessKeyId, secretAccessKey, region, bucket, folder });
  }
}
