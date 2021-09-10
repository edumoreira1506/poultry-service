export interface IPoultry {
  id: string;
  name: string;
  description: string;
  address: IPoultryAddress;
}

export interface IPoultryAddress {
  city: string;
  province: string;
  street: string;
  zipcode: string;
  number: number;
}
