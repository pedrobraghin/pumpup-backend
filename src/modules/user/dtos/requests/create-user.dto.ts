import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Sanitize } from '../../../../decorators/Sanitize.decorator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty()
  @IsString()
  @Sanitize()
  name: string;

  @ApiProperty()
  @IsEmail()
  @Sanitize()
  email: string;

  @ApiProperty()
  @IsString()
  @Sanitize()
  providerId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Sanitize()
  pictureUrl?: string;
}
