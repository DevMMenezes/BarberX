import axios from "axios";

export class AxiosReqIBGE {
  static baseURLIBGE = "https://servicodados.ibge.gov.br/api/v1/";
  static axiosInstance = axios.create();
}

export class AxiosReqAPI {
  static BaseURL = "https://api-navapp.space/";
  static axiosInstance = axios.create();
}
