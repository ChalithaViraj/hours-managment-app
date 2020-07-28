export interface IProject {
  _id: String;
  name: string;
  client: string;
  active: boolean;
}

export interface DProject {
  _id?: string;
  name: string;
  client: string;
  active: boolean;
}
