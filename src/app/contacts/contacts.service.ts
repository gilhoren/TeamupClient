import { Injectable } from '@angular/core';  
import { Contact } from '../model/Contact' ;  
  
  
@Injectable({  
  providedIn: 'root'  
})  
export class ContactsService {  
  contactList: Array<Contact> = ([  
      { id: 1, firstName: 'Gaya', lastName: 'Horen', motherName: 'Limor', fatherName: 'Gil', address: 'Shmaryahu Levin 14, Rishon Lezion', 
      birthdate: new Date('01-23-2017'), image: null },
      { id: 2, firstName: 'David', lastName: 'Buzaglo', motherName: 'Rosa', fatherName: 'Momo', address: 'Oxford, London', 
      birthdate: new Date('05-08-2012'), image: null },
      { id: 3, firstName: 'Momo', lastName: 'Rose', motherName: 'Catherine', fatherName: 'Lorne', address: '5th Avenue, NY City, New York', 
      birthdate: new Date('08-12-2009'), image: null },
    
  
  ])  
  constructor() { }  
  get() {  
    return this.contactList;  
  }  
}  