import { BuildPayload } from '../dtos/requests/build-payload';
import { WebhookService } from './../services/webhook.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}
  @Post('build')
  async publishBuild(@Body() data: BuildPayload) {
    this.webhookService.publishBuild(data);
  }
}
