import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetJobListRequestB {
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

export class GetJobListItemDetail {
  @ApiProperty()
  location: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  salaryRange: string;
}

export class GetJobListItemCompany {
  @ApiProperty()
  name: string;
  @ApiProperty()
  industry: string;
}

export class GetJobListResponseB {
  @ApiProperty()
  jobId: string;
  @ApiProperty()
  title: string;
  @ApiProperty({ type: GetJobListItemDetail })
  detail: GetJobListItemDetail;
  @ApiProperty({ type: GetJobListItemCompany })
  company: GetJobListItemCompany;
  @ApiProperty()
  skills: string[];
  @ApiProperty()
  postedDate: string;
}
