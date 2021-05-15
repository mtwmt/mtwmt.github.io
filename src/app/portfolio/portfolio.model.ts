export interface Work {
  year: number;
  portfolio: Portfolio[];
}

export interface Portfolio {
  title: string;
  images: string;
  link: string;
  device: string;
  description: string;
}
