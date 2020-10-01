import { Component, OnInit } from '@angular/core';
import {
  faEye,
  faEdit,
  faTrash,
  faArrowDown,
  faArrowUp,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Theater } from 'src/app/core/models/theater';
import { TheaterService } from 'src/app/core/theater.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

const columnList = [
  {
    name: 'Theater Name',
    key: 'theaterName',
  },
  {
    name: 'Theater City',
    key: 'theaterCity',
  },
  {
    name: 'Manager Name',
    key: 'managerName',
  },
  {
    name: 'Manager Contact',
    key: 'managerContact',
  },
];

@Component({
  selector: 'app-theater-list',
  templateUrl: './theater-list.component.html',
  styleUrls: ['./theater-list.component.css'],
})
export class TheaterListComponent implements OnInit {
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;
  faArrowDown = faArrowDown;
  faArrowUp = faArrowUp;
  faPlus = faPlus;

  theaters: Theater[] = [];

  columnList = columnList;
  sortedColumn: string;
  sortedOrder = 'asc';
  isOrderAscOrDesc = false;

  constructor(
    private theaterService: TheaterService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchTheaters();
  }

  fetchTheaters() {
    this.theaterService.getTheaters().subscribe(
      (data) => {
        this.theaters = data;
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

  onEdit(theaterId: number) {
    this.router.navigate([theaterId, 'edit'], { relativeTo: this.route });
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete theater?')) {
      this.theaterService.deleteTheater(id).subscribe(
        (data) => {
          this.toastr.success(data.message);
          this.fetchTheaters();
        },
        (error) => {
          this.toastr.error(error.error.message);
        }
      );
    }
  }
}
