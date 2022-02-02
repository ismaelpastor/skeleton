export const activeAccess = keys => {
  let users = '';
  if (keys !== null && keys !== undefined) {
    users = keys.reduce((prev, cur) => {
      let listUsers;
      const user =
        cur.user !== null ? `${cur.user.firstname} ${cur.user.lastname}` : '';
      if (prev === '') {
        listUsers = user;
      } else if (prev.indexOf(user) < 0) {
        listUsers = `${prev}, ${user}`;
      } else {
        listUsers = `${prev}`;
      }
      return listUsers;
    }, '');
  }
  return users;
};
