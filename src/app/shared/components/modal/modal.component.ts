import { Component, Input, OnInit } from '@angular/core';

export interface ModalType {
  title?: string;
  content?: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {



  _data: ModalType = {
    title: 'Tiele',
    content: 'Content'
  };
  get data(): ModalType {
    return this._data;
  }
  @Input()  set data(value: ModalType) {
    this._data = value;
  }


  constructor() { }

  ngOnInit(): void {
  }

}
