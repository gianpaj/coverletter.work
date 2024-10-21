declare interface CoverLetter {
  id: string;
  title: string;
  createdAt: Date;
  // userId: string
  path: string;
  messages: Message[];
  // sharePath?: string; // TODO: for the share url
  jobDescription?: string;
  intialCoverLetter: string;
}
