import axios from 'axios';

export class AxiosReq {
  static baseURLIBGE = "https://servicodados.ibge.gov.br/api/v1/";
  static axiosInstance = axios.create();
}
