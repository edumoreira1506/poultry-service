export interface IPoultry {
  id: string;
  name: string;
  description: string;
  address: IPoultryAddress;
  active: boolean;
}

export interface IPoultryAddress {
  city: string;
  province: string;
  street: string;
  zipcode: string;
  number: number;
}

export interface IPoultryUser {
  id: string;
  userId: string;
  poultryId: string;
}
