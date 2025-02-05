import { fetchUtils, DataProvider, DeleteParams, DeleteResult, RaRecord, DeleteManyResult, UpdateManyResult, GetManyReferenceResult } from "react-admin";

const apiUrl = "http://localhost:3001";
const httpClient = fetchUtils.fetchJson;

const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const { pagination = { page: 1, perPage: 10 }, sort = { field: "id", order: "ASC" } } = params || {};
    const { page, perPage } = pagination;
    const { field, order } = sort;

    const url = `${apiUrl}/${resource}?_sort=${field}&_order=${order}&_page=${page}&_limit=${perPage}`;
    const response = await httpClient(url);
    console.log('data=====',response.json);
    
    return {
      data: response.json,
      total: parseInt(response.json.length),
    };
  },

  getOne: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const response = await httpClient(url);
    return { data: response.json };
  },

  create: async (resource, params) => {
    const response = await httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    });
    return { data: response.json };
  },

  update: async (resource, params) => {
    const response = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });
    return { data: response.json };
  },
  delete: async <RecordType extends RaRecord = any>(
    resource: string,
    params: DeleteParams<RecordType>
  ): Promise<DeleteResult<RecordType>> => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    await httpClient(url, { method: "DELETE" });

    return { data: params.previousData as RecordType }; // Ensure 'data' is defined
  },
   getMany: async (resource, params) => {
    const query = params.ids.map((id) => `id=${id}`).join("&");
    const url = `${apiUrl}/${resource}?${query}`;
    
    const { json } = await httpClient(url);
    return { data: json };
  },
  getManyReference: function <RecordType extends RaRecord = any>(): Promise<GetManyReferenceResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  updateMany: function <RecordType extends RaRecord = any>(): Promise<UpdateManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  deleteMany: function <RecordType extends RaRecord = any>(): Promise<DeleteManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  }
};

export default dataProvider;
