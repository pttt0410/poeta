import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Output() closeModal = new EventEmitter<any>();
  @Input() title: any;

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.closeModal.emit();
  }

}
