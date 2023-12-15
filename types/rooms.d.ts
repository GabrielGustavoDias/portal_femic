import { IProject } from '../pages/home/types/stypes';

export interface IRooms {
  name: string;
  date: string;
  day: string;
  link: string;
  hour: string;
  _id: string;
  projects: string[];
  projects_list: IProject[];
}
