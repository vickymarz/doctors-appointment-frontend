const post = async (url, data) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, config);
    const datas = await response.json();
    return datas;
  } catch (err) {
    return err;
  }
};

const get = async (url) => {
  const config = {
    method: 'GET',
  };
  try {
    const response = await fetch(url, config);
    const datas = await response.json();
    return datas;
  } catch (err) {
    return err;
  }
};

const remove = async (url, data) => {
  const config = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, config);
    const datas = await response.json();
    return datas;
  } catch (err) {
    return err;
  }
};

const fetchApi = {
  post,
  get,
  remove,
};

export default fetchApi;
