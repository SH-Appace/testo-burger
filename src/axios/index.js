import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://demoappprojects.com/food-ordering/api/v1/',
  //localhost ip
  // baseURL: 'http://10.168.168.84:8080/api/v1/',
  //aws ip
  // baseURL: 'http://34.204.95.133:5000/api/v1',
});

export default instance;