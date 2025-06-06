export interface JobsDataTypes {
  annualSalaryMax: number;
  annualSalaryMin: number;
  salaryCurrency: string;
  companyLogo: string;
  companyName: string;
  id: number;
  jobDescription: string;
  jobGeo: string;
  jobIndustry: string;
  jobLevel: string;
  jobTitle: string;
  jobType: string[];
  pubDate: string;
  url: string;
}
export interface TitleTextDataTypes {
  titleText: string;
  titleClass: string;
}
export interface NavigationLinksDataTypes {
  id: number;
  href: string;
  text: string;
}
