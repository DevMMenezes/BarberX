import axios from "axios";

const Ambiente = {
  producao: {
    url: "https://api-navapp.space/",
  },
  homologacao: {
    // url: "http://192.168.0.101:3005/",
    url: "http://192.168.0.8:3005/",
  },
};

export class AxiosReqIBGE {
  static baseURLIBGE = "https://servicodados.ibge.gov.br/api/v1/";
  static axiosInstance = axios.create();
}

export class AxiosReqAPI {
  static BaseURL = Ambiente.homologacao.url;

  static axiosInstance = axios.create();
}
