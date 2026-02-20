export type ProjectMetric = {
  value: string;
  label: string;
};

export type ProjectItem = {
  id: string;
  title: string;
  cat: string;
  img: string;

  // Case Study Content
  problem: string;
  solution: string;
  impact: string;

  metrics?: ProjectMetric[];
  stack?: string[];

  live?: string;
  github?: string;
  year?: string;
  featured?: boolean;
};
