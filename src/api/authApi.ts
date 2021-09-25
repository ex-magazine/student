import { User } from "models";
import axiosClientLogin  from "./axiosClientLogin";


const authApi = {

  login(data: User): Promise<User> {
    const url = '/auth';
    
    return axiosClientLogin.get(url, {data});
  }, 
  register(data: Partial<User>): Promise<User> {
    const url = '/register';
    return axiosClientLogin.post(url, {data});
  }

}

export default authApi

