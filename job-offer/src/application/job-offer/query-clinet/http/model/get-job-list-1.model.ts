export class GetJobListRequestB {
  title: string;

  min: number;

  max: number;

  city: string;

  page: number;
}

export class GetJobListItemDetail {
  location: string;
  type: string;
  salaryRange: string;
}

export class GetJobListItemCompany {
  name: string;
  industry: string;
}

export class GetJobListResponseBItem {
  jobId: string;
  title: string;
  details: GetJobListItemDetail;
  company: GetJobListItemCompany;
  skills: string[];
  postedDate: string;
}

export class GetJobListItemMetaData {
  requestId: string;
  timestamp: string;
}

export class GetJobListResponse1 {
  metadata: GetJobListItemMetaData;
  jobs: GetJobListResponseBItem[];
}
