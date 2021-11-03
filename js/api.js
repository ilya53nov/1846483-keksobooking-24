const PATH_DATA_SERVER = 'https://24.javascript.pages.academy/keksobooking/data';
const PATH_SERVER = 'https://24.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onFail) => {
  fetch(PATH_DATA_SERVER)
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((advertisements) => onSuccess(advertisements));
      } else {
        throw new Error('Ошибка. Не удалось загрузить данные с сервера');
      }
    })
    .catch((err) => onFail(err));
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    PATH_SERVER,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok){
        onSuccess();
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
