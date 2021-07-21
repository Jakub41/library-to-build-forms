const HttpUtil = {
  get: async (url) => {
    const response = await fetch(url);
    if (response.ok) {
      return response;
    } else {
      const error = await response.text();
      console.error(error);
      return response;
    }
  },
  uploadFile: async (url, data) => {
    return await fetch(url, {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .catch((err) => console.warn(err));
  },
};

export default HttpUtil;
