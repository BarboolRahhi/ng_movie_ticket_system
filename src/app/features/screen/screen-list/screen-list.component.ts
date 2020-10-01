import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faEye,
  faEdit,
  faTrash,
  faArrowDown,
  faArrowUp,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Screen } from 'src/app/core/models/screen';
import { ScreenService } from './../../../core/screen.service';

const columnList = [
  {
    name: 'Screen Name',
    key: 'screenName',
  },
  {
    name: 'Row',
    key: 'rows',
  },
  {
    name: 'Column',
    key: 'columns',
  },
];

@Component({
  selector: 'app-screen-list',
  templateUrl: './screen-list.component.html',
  styleUrls: ['./screen-list.component.css'],
})
export class ScreenListComponent implements OnInit {
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;
  faArrowDown = faArrowDown;
  faArrowUp = faArrowUp;
  faPlus = faPlus;

  screens: Screen[] = [];

  columnList = columnList;
  sortedColumn: string;
  sortedOrder = 'asc';
  isOrderAscOrDesc = false;

  constructor(
    private screenService: ScreenService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchScreens();
  }

  fetchScreens() {
    this.screenService.getScreens().subscribe(
      (data) => {
        this.screens = data;
      },
      (error) => console.log(error)
    );
  }

  onSortedClick(column: string) {
    console.log(column);
    this.sortedColumn = column;
    this.isOrderAscOrDesc = !this.isOrderAscOrDesc;
    if (this.isOrderAscOrDesc) {
      this.sortedOrder = 'desc';
    } else {
      this.sortedOrder = 'asc';
    }
  }

  onEdit(id: number) {
    this.router.navigate([id, 'edit'], { relativeTo: this.route });
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete theater?')) {
      this.screenService.deleteScreen(id).subscribe(
        (data) => {
          this.toastr.success(data.message);
          this.fetchScreens();
        },
        (error) => {
          this.toastr.error(error.error.message);
        }
      );
    }
  }
}
