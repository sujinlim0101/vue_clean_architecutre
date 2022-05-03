import { APIResponse } from './APIResponse';
import { APIRequest } from './APIRequest';
export interface NetworkClient {
  request: <U extends APIResponse>(request: APIRequest<U>) => Promise<U>

}
