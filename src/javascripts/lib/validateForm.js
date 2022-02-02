export const validateField = (name, value) => {
  const field = {};
  switch (name) {
    case 'email':
      field[name] = {
        value,
        status: null,
        messageStatus: ''
      };

      if (value !== '') {
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          field[name].status = 'success';
          field[name].messageStatus = '';
        } else {
          field[name].status = 'error';
          field[name].messageStatus = 'You have to report an email';
        }
      } else {
        field[name].status = null;
        field[name].messageStatus = '';
      }
      break;
    default:
      field[name] = value;
      break;
  }
  return field;
};
