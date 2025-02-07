import { IEntity } from '@common/interfaces/entity.interface';
import { IDated } from '@common/interfaces/dated.interface';

export interface ICompany {
  name: string;
  website: string;
  industry: string;
  city: string;
  state: string;
}
export interface ICompanyEntity extends ICompany, IEntity, IDated {}
