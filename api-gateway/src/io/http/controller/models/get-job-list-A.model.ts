import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetJobListRequestA {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  min: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  max: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumberString()
  page: number;
}

export class GetJobListItemLocation {
  @ApiProperty()
  city: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  remote: boolean;
}

export class GetJobListItemCompensation {
  @ApiProperty()
  min: number;
  @ApiProperty()
  max: number;
  @ApiProperty()
  currency: string;
}

export class GetJobListItemEmployer {
  @ApiProperty()
  companyName: string;
  @ApiProperty()
  website: string;
}

export class GetJobListItemRequirement {
  @ApiProperty()
  experience: number;
  @ApiProperty()
  technologies: string[];
}

export class GetJobListResponseA {
  @ApiProperty()
  id: string;
  @ApiProperty()
  position: string;
  @ApiProperty({ type: GetJobListItemLocation })
  location: GetJobListItemLocation;
  @ApiProperty({ type: GetJobListItemCompensation })
  compensation: GetJobListItemCompensation;
  @ApiProperty({ type: GetJobListItemEmployer })
  employer: GetJobListItemEmployer;
  @ApiProperty({ type: GetJobListItemRequirement })
  requirements: GetJobListItemRequirement;
  @ApiProperty()
  postedDate: string;
}
