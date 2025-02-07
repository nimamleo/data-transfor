import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JobEntity } from './job.entity';
import { ICompany, ICompanyEntity } from '../../../model/company.model';

@Entity('companies')
export class CompanyEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website: string;

  @Column({ type: 'varchar', length: 255 })
  industry: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar' })
  state: string;

  @OneToOne(() => JobEntity, (x) => x.company)
  jobs: JobEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  static fromICompany(iCompany: ICompany): CompanyEntity {
    if (!iCompany) return null;

    const company = new CompanyEntity();
    company.name = iCompany.name;
    company.website = iCompany.website;
    company.industry = iCompany.industry;
    company.city = iCompany.city;
    company.state = iCompany.state;

    return company;
  }

  static toICompanyEntity(company: CompanyEntity): ICompanyEntity {
    if (!company) return null;

    return {
      id: company.id.toString(),
      name: company.name,
      website: company.website,
      industry: company.industry,
      city: company.city,
      state: company.state,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    };
  }
}
