import api from '../config/api';

// interface IUsers {
//   name: string;
//   avatar_url: string;
//   country: string;
//   state: string;
// }

// interface RequestUsers {
//   data(data: any): unknown;
//   count: number;
//   limit: number;
//   users: IUsers[];
// }

export function getUsers(data, page = 0) {
  const dataRequest = {
    country: data.country,
    state: data.state,
    modality: data.modality,
    page,
  };

  return api.patch('/user/show', data);
}
