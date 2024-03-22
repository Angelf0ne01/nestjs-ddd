import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthCheckApiController {
  @Get()
  @ApiResponse({
    status: 200,
    description: `return boolean`,
  })
  health() {
    return true;
  }
}
