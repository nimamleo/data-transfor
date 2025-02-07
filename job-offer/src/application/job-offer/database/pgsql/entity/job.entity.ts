import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CompanyEntity } from './company.entity';
import { IJob, IJobEntity } from '../../../model/job.model';

@Entity('jobs')
@Index(['title'])
export class JobEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true, unique: true })
  customId: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'int' })
  minSalary: number;

  @Column({ type: 'int' })
  maxSalary: number;

  @Column({ type: 'varchar' })
  currency: string;

  @Column({ type: 'int', nullable: true })
  experience: number;

  @Column({ type: 'varchar' })
  position: string;

  @Column({ type: 'bigint', unsigned: true })
  companyId: number;

  @OneToOne(() => CompanyEntity, (x) => x.jobs, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'companyId' })
  company: CompanyEntity;

  @Column('varchar', { array: true })
  requirements: string[];

  @Column({ type: 'timestamp' })
  postedDate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  static fromIJob(iJob: IJob): JobEntity {
    if (!iJob) return null;

    const job = new JobEntity();
    job.customId = Number(iJob.customId);
    job.title = iJob.title;
    job.minSalary = iJob.minSalary;
    job.maxSalary = iJob.maxSalary;
    job.currency = iJob.currency;
    job.experience = iJob.experience;
    job.position = iJob.position;
    job.companyId = Number(iJob.company.id);
    job.requirements = iJob.requirements;
    job.postedDate = iJob.postedDate;

    return job;
  }

  static toIJobEntity(job: JobEntity): IJobEntity {
    if (!job) return null;

    return {
      id: job.id.toString(),
      customId: job.customId.toString(),
      title: job.title,
      minSalary: job.minSalary,
      maxSalary: job.maxSalary,
      currency: job.currency,
      experience: job.experience,
      position: job.position,
      company: job.company
        ? CompanyEntity.toICompanyEntity(job.company)
        : { id: job.companyId.toString() },
      requirements: job.requirements,
      postedDate: job.postedDate,
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
    };
  }
}
