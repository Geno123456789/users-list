type GeoType = {
    lat: string;
    lng: string;
};
  
type AddressType = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: GeoType;
};
  
type CompanyType = {
    name: string;
    catchPhrase: string;
    bs: string;
};
  
export type UserDataType = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: AddressType;
    phone: string;
    website: string;
    company: CompanyType;
};

