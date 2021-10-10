export interface Address {
  id?: number | string;
  name: string;
  address: string;
}

export interface Profile {
  id?: string;
  name: string;
  addressList: Address[];
}