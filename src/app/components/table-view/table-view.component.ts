import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {

  value: any = [];
  @Input() tableData: any;
  constructor() { }

  ngOnInit(): void {
  }

  //Changes in componnet detects here
  ngOnChanges() {
    if(this.tableData.length && this.tableData[0].start) {
      this.value = [];
    }
    this.value = [...this.value, ...this.tableData];
  }

}
