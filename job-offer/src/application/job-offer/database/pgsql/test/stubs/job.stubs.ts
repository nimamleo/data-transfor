import { ICompany } from '../../../../model/company.model';
import { IJob } from '../../../../model/job.model';
import { companyStub } from './company.stubs';

export const jobStub = (company?: Partial<ICompany>): IJob => {
  const data: IJob = {
    title: 'Senior Software Engineer',
    customId: '5',
    minSalary: 80000,
    maxSalary: 120000,
    currency: 'USD',
    experience: 5,
    requirements: ['TypeScript', 'Node.js', 'PostgreSQL'],
    position: 'Senior',
    company: companyStub({}),
    postedDate: new Date('2024-01-01'),
  };

  Object.assign(data, company);

  return data;
};
