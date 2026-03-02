import { Deployment } from "./deployment";

export interface Project {
  id: number;
  project: string;
  type: string;
  tools: string[];
  deployment: Deployment;
  projectUrl: string;
  description: string;
  imageUrl: string;
  symbol: string;
}