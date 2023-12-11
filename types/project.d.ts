
export interface IEvaluation {
  nota1: number;
  nota2: number;
  nota3: number;
  nota4: number;
  nota5: number;
  nota6: boolean | number;
  avaliador: string;
  avaliador_nome: string;
  somatorio: number;
}

export interface IEvaluation2 {
  nota1: number;
  nota2: number;
  nota3: number;
  nota4: number;
  nota5: number;
  nota6: number;
  nota7: number;
  nota8: number;
  avaliador: string;
  avaliador_nome: string;
  somatorio: number;
}


interface IInstituition {
  adm_category: string;
  city: string;
  country: string;
  email: string;
  name: string;
  number: string;
  state: string;
}

export interface IProject {
	live: any;
  _id: string;
  id_femic: string;
  title: string;
  hidden: boolean;
  banner: string;
  team: any[];
  advisors: any[];
  stage: string;
  finalized: boolean;
  modality: string;
  status: string;
  area: string;
  resume: string;
  keywords: string[];
  short_desc: string;
  link_yt: string;
  relatorio: string;
  isAccredited: boolean;
  instituition: IInstituition;
  rank: number;
  avaliacao: any;
  certificate: string;
  winner: any;
}

