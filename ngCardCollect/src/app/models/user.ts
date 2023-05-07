import { Card } from "./card";

export class User {
  id: number;
  username: string;
  password: string;
  role: string;
  email: string;
  cards: Card [];

  constructor(
    id: number = 0,
    username: string = '',
    password: string = '',
    role: string = '',
    email: string = '',
    cards: Card [] = [],
  ){
    this.id =id;
    this.username = username;
    this.password = password;
    this.role = role;
    this.email =  email;
    this.cards = cards;

  }
}
