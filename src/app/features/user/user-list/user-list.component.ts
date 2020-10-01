import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faEdit,
  faTrash,
  faArrowDown,
  faArrowUp,
  faPlus,
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/user';
import { UserService } from './../../../core/user.service';

const columnList = [
  {
    name: 'User Name',
    key: 'username',
  },
  {
    name: 'Email',
    key: 'email',
  },
  {
    name: 'Contact',
    key: 'contact',
  },
];

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  faTimesCircle = faTimesCircle;
  faCheckCircle = faCheckCircle;
  faEdit = faEdit;
  faTrash = faTrash;
  faArrowDown = faArrowDown;
  faArrowUp = faArrowUp;
  faPlus = faPlus;

  users: User[] = [];

  columnList = columnList;
  sortedColumn: string;
  sortedOrder = 'asc';
  isOrderAscOrDesc = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.users = this.users.map((user) => {
          const isAdmin = user.roles
            .map((role) => role.name)
            .includes('ROLE_ADMIN');
          return {
            ...user,
            isAdmin,
          };
        });
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

  onEdit(userId: number) {
    this.router.navigate([userId, 'edit'], { relativeTo: this.route });
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete user?')) {
      this.userService.deleteUser(id).subscribe(
        (data) => {
          this.toastr.success(data.message);
          this.fetchUsers();
        },
        (error) => {
          this.toastr.error(error.error.message);
        }
      );
    }
  }
}
