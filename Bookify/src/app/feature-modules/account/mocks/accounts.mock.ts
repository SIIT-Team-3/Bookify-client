import {Account} from "../model/account";
import {Address} from "../model/address";

const account1: Account = {
  id: 1,
  email: 'test@example.com',
  firstName: 'Pera',
  lastName: 'Peric',
  blocked: false,
  phone: '+381621303',
  address: {
    country: 'Serbia',
    city: 'Belgrade',
    address: 'Svetog Save 37',
    zipCode: '11000'
  }
}

const account2: Account = {
  id: 1,
  email: 'test1@example.com',
  firstName: 'Pera1',
  lastName: 'Peric1',
  blocked: false,
  phone: '+38162172',
  address: {
    country: 'Serbia',
    city: 'Novi Sad',
    address: 'Trg Dositeja Obradovica 6',
    zipCode: '11000'
  }
}

const account3: Account = {
  id: 1,
  email: 'test@example.com',
  firstName: 'Teodor',
  lastName: 'Teodorovic',
  blocked: false,
  phone: '+381655555',
  address: {
    country: 'Serbia',
    city: 'Novi Sad',
    address: 'Trg Dositeja Obradovica 6',
    zipCode: '11000'
  }
}
export {account2, account1, account3}

