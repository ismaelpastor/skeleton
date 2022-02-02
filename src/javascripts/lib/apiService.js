const baseUrl = process.env.REACT_APP_BASE_URL;

export const retrieveLockers = async auth => {
  try {
    const response = await fetch(`${baseUrl}/devices`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth
      }
    });
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const retrieveDevicesMasterkey = async (auth, id) => {
  try {
    const response = await fetch(`${baseUrl}/masterkeys/${id}/devices`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth
      }
    });
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const retrieveKeys = async (auth, lockerId) => {
  try {
    const response = await fetch(`${baseUrl}/keys/${lockerId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth
      }
    });
    const json = await response.json();
    return json;
  } catch (err) {
    return [];
  }
};

export const retrieveLocker = async (auth, lockerId) => {
  try {
    const response = await fetch(`${baseUrl}/devices/${lockerId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth
      }
    });
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const createLocker = async (locker, auth) => {
  try {
    return await fetch(`${baseUrl}/devices`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth
      },
      body: JSON.stringify(locker)
    });
  } catch (err) {
    return null;
  }
};

export const modifyLocker = async (locker, auth) => {
  try {
    const response = await fetch(`${baseUrl}/devices/${locker.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth
      },
      body: JSON.stringify(locker)
    });
    return response.ok;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const profile = auth =>
  fetch(`${baseUrl}/profile`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: auth
    }
  }).then(res => res.json());

export const auth = (email, password) =>
  fetch(`${baseUrl}/auth`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(res => res.json());

export const forgot = async email => {
  try {
    const response = await fetch(`${baseUrl}/forgot`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    return response;
  } catch (err) {
    return null;
  }
};

export const createKey = async (key, auth) => {
  try {
    return await fetch(`${baseUrl}/keys`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth
      },
      body: JSON.stringify(key)
    });
  } catch (err) {
    return null;
  }
};

export const assignDeviceMasterkeyApi = async (masterkey, locker, auth) => {
  try {
    const response = await fetch(
      `${baseUrl}/masterkeys/${masterkey}/assignDevice`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: auth
        },
        body: JSON.stringify(locker)
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const unAssignDeviceMasterkeyApi = async (masterkey, locker, auth) => {
  try {
    const response = await fetch(
      `${baseUrl}/masterkeys/${masterkey}/unAssignDevice`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: auth
        },
        body: JSON.stringify(locker)
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const removeKey = async (key, auth) => {
  try {
    return await fetch(`${baseUrl}/keys`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth
      },
      body: JSON.stringify(key)
    });
  } catch (err) {
    return err;
  }
};

export const revokeKeyApi = async (key, auth) => {
  try {
    const response = await fetch(`${baseUrl}/keys/revokeFirst`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth
      },
      body: JSON.stringify(key)
    });
    const json = await response.json();
    return json;
  } catch (err) {
    return err;
  }
};

export const retrieveUsers = async auth => {
  try {
    const response = await fetch(`${baseUrl}/users`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth
      }
    });
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const retrieveUser = async (auth, userId) => {
  try {
    const response = await fetch(`${baseUrl}/users/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth
      }
    });
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const createUser = async (user, auth) => {
  try {
    const response = await fetch(`${baseUrl}/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth
      },
      body: JSON.stringify(user)
    });
    const json = await response.json();
    return json;
  } catch (err) {
    return null;
  }
};

export const modifyUser = async (user, auth) => {
  try {
    const response = await fetch(`${baseUrl}/users/${user.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth
      },
      body: JSON.stringify(user)
    });
    return response.ok;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const retrieveMasterkeys = async auth => {
  try {
    const response = await fetch(`${baseUrl}/masterkeys`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth
      }
    });
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const retrieveMasterkey = async (auth, masterkeyId) => {
  try {
    const response = await fetch(`${baseUrl}/masterkeys/${masterkeyId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth
      }
    });
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const createMasterkey = async (masterkey, auth) => {
  try {
    const response = await fetch(`${baseUrl}/masterkeys`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth
      },
      body: JSON.stringify(masterkey)
    });
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const modifyMasterkey = async (masterkey, auth) => {
  try {
    const response = await fetch(`${baseUrl}/masterkeys/${masterkey.id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth
      },
      body: JSON.stringify(masterkey)
    });
    return response.ok;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const revokeMasterkeyApi = async (masterkey, auth) => {
  try {
    const response = await fetch(`${baseUrl}/masterkeys/revokeFirst/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth
      },
      body: JSON.stringify(masterkey)
    });
    const json = await response.json();
    return json;
  } catch (err) {
    return err;
  }
};

export const removeMasterkey = async (masterkey, auth) => {
  try {
    return await fetch(`${baseUrl}/keys`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth
      },
      body: JSON.stringify(masterkey)
    });
  } catch (err) {
    return err;
  }
};
