export class ICompany {
  name: string;
  city: string;
  industry: string;
  website: string;
  state: string;
}

export class ICreateJobOfferRequest {
  id: string;
  title: string;
  minSalary: number;
  maxSalary: number;
  currency: string;
  experience?: number;
  requirements: string[];
  position: string;
  company: ICompany;
}
