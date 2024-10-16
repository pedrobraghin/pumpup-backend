import { Injectable, Logger } from '@nestjs/common';
import { BuildPayload } from '../dtos/requests/build-payload';

@Injectable()
export class WebhookService {
  publishBuild(data: BuildPayload) {
    Logger.log(data);
  }
}
