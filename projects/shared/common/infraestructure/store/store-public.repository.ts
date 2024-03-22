import { ConfigService } from '@nestjs/config';
import { StoreProxyService } from '@shared/clients/store/store-proxy-service';

export class StorePublic extends StoreProxyService {
  constructor(config: ConfigService) {
    const {
      accessKeyId = '',
      secretAccessKey = '',
      region = '',
      bucket = '',
      folder = '',
    } = config.get('aws_s3_cdn') || {};
    super({ accessKeyId, secretAccessKey, region, bucket, folder });
  }
}
