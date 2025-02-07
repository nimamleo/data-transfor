export class GetJobListRequestA {}

export class GetJobListItemLocation {
  city: string;
  state: string;
  remote: boolean;
}

export class GetJobListItemCompensation {
  min: number;
  max: number;
  currency: string;
}

export class GetJobListItemEmployer {
  companyName: string;
  website: string;
}

export class GetJobListItemRequirement {
  experience: number;
  technologies: string[];
}

export class GetJobListItemMetaData {
  requestId: string;
  timestamp: string;
}

export class JobListResponseItem2 {
  id: string;
  position: string;
  location: GetJobListItemLocation;
  compensation: GetJobListItemCompensation;
  employer: GetJobListItemEmployer;
  requirements: GetJobListItemRequirement;
  datePosted: string;
}

export class JobList {
  [key: string]: JobListResponseItem2;
}

export class GetJobListResponse2 {
  status: string;
  data: {
    jobsList: JobList;
  };
}
