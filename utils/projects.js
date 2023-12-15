export const getModalityProject = () => {
  let modality = sessionStorage.getItem('page') || '';

  if (modality == 'jovem') {
    modality = 'jov';
  } else if (modality == 'junior') {
    modality = 'jun';
  } else if (modality == 'mais') {
    modality = 'mais';
  } else if (modality == 'orientador') {
    modality = 'orientador';
  }

  return modality;
};

export const modalityList = (value) => {
  const modality = value;
  if (modality == 'junior') {
    return [
      { id: 'ei1', value: 'Educação Infantil' },
      { id: 'ei2', value: 'Anos Iniciais do Ensino Fundamental' },
    ];
  } else if (modality == 'jovem') {
    return [
      { id: 'ej1', value: 'Anos finais do Ensino Fundamental' },
      { id: 'ej2', value: 'Ensino Médio' },
      { id: 'ej3', value: 'Ensino Técnico' },
    ];
  } else if (modality == 'all') {
    return [
      { id: 'ei1', value: 'Educação Infantil' },
      { id: 'ei2', value: 'Anos Iniciais do Ensino Fundamental' },
      { id: 'ej1', value: 'Anos finais do Ensino Fundamental' },
      { id: 'ej2', value: 'Ensino Médio' },
      { id: 'ej3', value: 'Ensino Técnico' },
      { id: 'm1', value: 'Professores da Educação Básica' },
      { id: 'm2', value: 'Professores e/ou estudantes do Ensino Superior' },
      { id: 'm5', value: 'Profissionais diversos' },
    ];
  } else {
    return [
      { id: 'm1', value: 'Professores da Educação Básica' },
      { id: 'm2', value: 'Professores e/ou estudantes do Ensino Superior' },
      { id: 'm5', value: 'Profissionais diversos' },
    ];
  }
};

export const renderModalityInstituition = (mod) => {
  if (mod == 'publica') {
    return 'Pública';
  } else if (mod == 'privada') {
    return 'Privada';
  } else if (mod == 'filantropica') {
    return 'Filantrópica';
  }
};

export const renderAreaProject = (area) => {
  if (area == 'c_exatas_terra') {
    return 'Ciências Exatas e da Terra';
  } else if (area == 'c_biologicas') {
    return 'Ciências Biológicas';
  } else if (area == 'engenharias') {
    return 'Engenharias';
  } else if (area == 'c_saude') {
    return 'Ciências da Saúde';
  } else if (area == 'c_agrarias') {
    return 'Ciências Agrárias';
  } else if (area == 'c_sociais_aplicadas') {
    return 'Ciências Sociais Aplicadas';
  } else if (area == 'c_humanas') {
    return 'Ciências Humanas';
  } else if (area == 'letras_letras_artes') {
    return 'Linguística, Letras e Artes';
  }
};
