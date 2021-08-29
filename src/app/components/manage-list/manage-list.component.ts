import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HttpService } from '@services/http.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-manage-list',
  templateUrl: './manage-list.component.html',
  styleUrls: ['./manage-list.component.css']
})
export class ManageListComponent implements OnInit, OnDestroy {

  @ViewChild('template') template: TemplateRef<any>;
  @ViewChild('templateDelete') templateDelete:TemplateRef<any>;

  modalRef: BsModalRef;
  meal = new FormControl('');
  indexActive: number;
  isEdit: Boolean;
  destroy$ = new Subject();

  data = [
    { meal: "Arrabiata", count: 0},
    { meal: "Pie", count: 0 },
    { meal: "Chicken", count: 0}
  ];

  constructor(
    private httpService: HttpService,
    private modalService: BsModalService,

  ) { }

  ngOnInit(): void {
    this.getList();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      backdrop: 'static',
      keyboard: false 
    });
  }

  closeModal() {
    this.modalRef.hide();
  }

  getList() {
    this.data.map((item, index) => {
      this.getCount(item.meal, index);
    })
  }

  getCount(meal: string, index: number) {
    this.httpService.getList(meal)
    .pipe(takeUntil(this.destroy$))
    .subscribe((res: any) => { 
      this.data[index].count = res.meals ? res.meals.length : 0 
    })
  }

  addNew() {
    this.openModal(this.template);
  }

  editMeal(index: number) {
    this.isEdit = true;
    this.indexActive = index;
    this.meal.setValue(this.data[index].meal);
    this.openModal(this.template);
  }


  saveData() {
    if (this.isEdit) {
      this.data[this.indexActive].meal = this.meal.value;
      this.getCount(this.meal.value, this.indexActive);
    } else {
      this.data.push({meal: this.meal.value, count: 0});
      this.getCount(this.meal.value, this.data.length - 1);
    }
    this.closeModal();
    this.isEdit = false;
  }

  openTemplateDelete(index: number) {
    this.indexActive = index;
    this.openModal(this.templateDelete);
  }

  deleteMeal() {
    this.data.splice(this.indexActive, 1);
    this.closeModal();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
