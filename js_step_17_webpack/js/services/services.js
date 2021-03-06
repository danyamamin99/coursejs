const postData = async (url, data) => {
  let res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8'
    },
    body: data,
  });

  return await res.json();
};

const getMenu = async (url) => {
  let res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Ошибка по адресу: ${url}, статус ${res.status}!`);a
  }

  return await res.json();
}; 

export {postData};
export {getMenu};