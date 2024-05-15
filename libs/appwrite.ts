import { Client, Account, ID, Databases } from 'appwrite';


const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65dd381024ce666e0ee1');

    export const ACCOUNT = new Account(client)
    export const DATABASE = new Databases(client)

    export const UNIQUE_ID = ID.unique()
    

    