
export interface IUser {
  _id: string;
  
  name: string;

  identifier: string;

  avatar_url: string;

  email: string;

  password: string;

  number: string;

  date_nas: string;

  country: string;

  state: string;

  city: string;

  sex: string;

  color: string;

  associated_ampic: string;

  school: string;

  modality: string;

  especial: string;

  fluent: string;

  formation: string;

  singUp_date: string;
  
  profiles: [any];
}
