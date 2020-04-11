import { Component, OnInit, ViewChild } from '@angular/core';
import { Contact } from '../model/Contact';
import { ContactsService } from './contacts.service';
import { Table } from 'primeng/table/primeng-table';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contacts: Contact[];
  loading: boolean = true;
  @ViewChild('dt') table: Table;

  constructor(private contactsService: ContactsService) { }

  ngOnInit(): void {
    this.contacts = this.contactsService.get();
    this.loading = false;    

  }

  
  onDateSelect(value) {
    this.table.filter(this.formatDate(value), 'date', 'equals')
}

  formatDate(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
        month = '0' + month;
    }

    if (day < 10) {
        day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
  }
}


