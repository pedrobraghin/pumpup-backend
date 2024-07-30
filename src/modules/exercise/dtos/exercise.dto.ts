import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class Exercise {
  @ApiResponseProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  difficulty: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  targetMuscle: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  @ApiResponseProperty()
  createdAt: Date;

  @ApiResponseProperty()
  updatedAt: Date;
}
