import axios from "axios";
// import { AsyncStorage } from "react-native";

/**
 * Custom HTTP Service Requests utility which uses axios at core.
 * This service adds authentication token to the request header and
 * takes an optional argument of query params and structures an
 * appropriate URL.
 *
 * @name ServiceRequests
 * @param {string} baseURL - Base URL of services.
 * @example
 * import ServiceRequests from 'utils/ServiceRequests';
 * request = new ServiceRequests('https://my-url');
 * const service = new ServiceRequests('http://10.1.11.31:8080/');
 * service.get('my-end-point/').then(..).catch(..);
 */

class ServiceRequests {
  auth_token = null;
  constructor(baseURL) {
    this.service = axios.create({
      baseURL,
      headers: {
        Authorization: this.auth_token ? "Token " + this.auth_token : null,
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
  }

  /**
   *
   *  Static method for setting auth token
   */
  static setAuthToken(token) {
    this.auth_token = token;
  }

  /**
   * For Get Requests.
   *
   */
  get(url, payload) {
    return this.service.get(`${url}`, payload);
  }

  /**
   * For Post Requests.
   *
   */
  post(url, payload) {
    return this.service.post(url, payload);
  }

  /**
   * For Put Requests.
   *
   */
  put(url, payload) {
    return this.service.put(url, payload);
  }

  /**
   * For Delete Requests
   *
   */
  delete(url) {
    return this.service.delete(url);
  }
}

export default ServiceRequests;
