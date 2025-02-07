import { StreamKey } from "../../rabbitmq/stream-key";

export class JobOfferCreate implements StreamKey {
  customId: string;
  title: string;
  minSalary: number;
  maxSalary: number;
  currency: string;
  experience?: number;
  requirements: string[];
  position: string;
  postedDate: Date;
  company: {
    name: string;
    city: string;
    industry: string;
    website: string;
    state: string;
  };

  constructor(init?: Partial<JobOfferCreate>) {
    Object.assign(this, init);
  }

  streamKey(): string {
    return "schedule:job-offer:create";
  }
}

export class JobOfferCreated {
  success: boolean;

  constructor(init?: Partial<JobOfferCreated>) {
    Object.assign(this, init);
  }

  streamKey(): string {
    return "schedule:job-offer:created";
  }
}
