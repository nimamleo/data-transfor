import { ICompany } from '../../../../model/company.model';

export const companyStub = (company?: Partial<ICompany>): ICompany => {
  const data = {
    name: 'Tech Corp',
    website: 'https://techcorp.com',
    industry: 'Technology',
    city: 'San Francisco',
    state: 'CA',
  };

  Object.assign(data, company);

  return data;
};
