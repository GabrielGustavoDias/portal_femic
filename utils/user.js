export const convertSexToString = (sex_char) => {
  let sexo = '';
  if (sex_char == 'm') {
    sexo = 'Masculino';
  } else if (sex_char == 'f') {
    sexo = 'Feminino';
  } else {
    sexo = 'Não informado';
  }

  return sexo;
};

export const renderColor = (color) => {
  if (color == '+') {
    return 'Não informado';
  }
  return color;
};

export const renderModality = (modality) => {
  if (modality == 'jov') {
    return 'Jovem';
  } else if (modality == 'jun') {
    return 'Júnior';
  } else if (modality == 'prof') {
    return 'Mais';
  } else if (modality == 'mais') {
    return 'Mais';
  } else if (modality == 'ori') {
    return 'Orientadores';
  }
};

export const idiomasTypes = [
  { value: 'pt', label: 'Português' },
  { value: 'en', label: 'Inglês' },
  { value: 'fr', label: 'Francês' },
  { value: 'es', label: 'Espanhol' },
  { value: 'ma', label: 'Mandarim' },
  { value: 'al', label: 'Alemão' },
  { value: 'ar', label: 'Árabe' },
  { value: 'jp', label: 'Japonês' },
  { value: 'outros', label: 'Outros' },
];

export const renderDate = (dt) => {
  const date = new Date(dt);
  date.setDate(date.getDate() + 1);
  return date.toLocaleDateString();
};

export const defsTypes = [
  { value: 'def_fisica', label: 'Deficiência Física' },
  { value: 'def_auditiva', label: 'Deficiência auditiva' },
  { value: 'def_visual', label: 'Deficiência visual' },
  { value: 'def_mental', label: 'Deficiência mental' },
  { value: 'def_mult', label: 'Deficiência múltipla' },
];

export const formationTypes = [
  { value: 'c_exatas_terra', label: 'Ciências Exatas e da Terra' },
  { value: 'c_biologicas', label: 'Ciências Biológicas' },
  { value: 'engenharias', label: 'Engenharias' },
  { value: 'c_saude', label: 'Ciências da Saúde' },
  { value: 'c_agrarias', label: 'Ciências Agrárias' },
  { value: 'c_sociais_aplicadas', label: 'Ciências Sociais Aplicadas' },
  { value: 'c_humanas', label: 'Ciências Humanas' },
  { value: 'letras_letras_artes', label: 'Linguística, Letras e Artes' },
];
