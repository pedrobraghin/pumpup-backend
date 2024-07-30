import { IsInt, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExerciseDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(3)
  difficulty: number;

  @ApiProperty()
  @IsString()
  type: 'cardio' | 'muscle';

  @ApiProperty()
  @IsString()
  targetMuscle: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  image: string;
}
