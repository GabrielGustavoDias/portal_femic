export const phoneMask = (phone) => {
  let num = phone.replace(/\D/g, '');
  num = num.replace(/^0/, '');
  if (num.length > 10) {
    num = num.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3');
  } else if (num.length > 5) {
    num = num.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3');
  } else if (num.length > 2) {
    num = num.replace(/^(\d\d)(\d{0,5})/, '($1) $2');
  } else {
    num = num.replace(/^(\d*)/, '($1');
  }
  return num;
};

export const cpfPassportMask = (identifier) => {
  let str = identifier.trim();
  return str.replace(/[^a-zA-Z0-9s]/g, '');
};

export const passwordMask = (pass) => {
  // /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.\-_]){3,}$/
};

const caaeMask = (caae) => {
  let str = caae.trim();
  str = str.replace(/[a-zA-Z]/g, '');
  return str;
};
