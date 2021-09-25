import {ListParams, ListResponse, Students } from "models";
import axiosClient from "./axiosClient";


const studentApi =  {
  getAll(params: ListParams): Promise<ListResponse<Students>> {
    const url = '/students';
    return axiosClient.get(url, { params });
  },

  getById(id: string): Promise<Students> {
    const url = `/students/${id}`;
    return axiosClient.get(url);
  },

  add(data: Students): Promise<Students> {
    const url = '/students';
    return axiosClient.post(url,  data );
  },

  update(data: Partial<Students>): Promise<Students> {
    //const url =  `/students/${data.id}`;   
    const url =  `/students/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id: string): Promise<any> {
    const url = `/students/${id}`;
    return axiosClient.delete(url);
  }

}

export default studentApi;