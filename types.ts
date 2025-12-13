export interface Order {
  orderId: string;
  timestamp: string;
  senderName: string;
  senderAddress: string;
  receiverName: string;
  receiverAddress: string;
  mobile: string;
  pincode: string;
  city: string;
  state: string;
  courier: string;
  status: string;
  batchId?: string;
}

export interface AppSettings {
  githubToken: string;
  repoOwner: string;
  repoName: string;
  csvPath: string;
}

export interface GitHubFileResponse {
  content?: string;
  sha: string;
  encoding?: string;
}

export enum Tab {
  DASHBOARD = 'dashboard',
  NEW_ORDER = 'new_order',
  SETTINGS = 'settings',
}