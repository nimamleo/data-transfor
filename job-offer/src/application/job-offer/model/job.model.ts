import { ICompanyEntity } from './company.model';
import { IEntity } from '@common/interfaces/entity.interface';
import { IDated } from '@common/interfaces/dated.interface';

export interface IJob {
  title: string;
  customId: string;
  minSalary: number;
  maxSalary: number;
  currency: string;
  experience?: number;
  requirements: string[];
  position: string;
  company: Partial<ICompanyEntity>;
  postedDate: Date;
}

export interface IJobEntity extends IEntity, IDated, IJob {}
