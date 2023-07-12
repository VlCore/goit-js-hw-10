import axios from 'axios';

export class CatApiFetch {
  API_OBJ = {
    baseURL: 'https://api.thecatapi.com/v1',
    headers: {
      'x-api-key':
        'live_tswNrdrrR5rwAq8Xx54AAkL7v2BbZdmV0JxxDk8J8CVakwyOgU4AczBBaXqkmlSz',
    },
  };

  constructor() {}

  fetchEl(url, params) {
    const objOptions = JSON.parse(JSON.stringify(this.API_OBJ))
    if (params) {
      objOptions.params = params
    }
    return axios.get(`${url}`, objOptions).then(({ data }) => {
    return data;
    })
  }
}