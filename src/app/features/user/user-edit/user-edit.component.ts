import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  user: Observable<User>;
  isEditMode = false;
  userId: number;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      const id = +param.id;
      if (id) {
        this.userId = id;
        this.isEditMode = true;
        this.user = this.userService
          .getUser(id)
          .pipe(tap((user) => this.userForm.patchValue(user)));
      }
    });
    this.formInit();
  }

  formInit() {
    if (this.isEditMode) {
      this.userForm = this.fb.group({
        username: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
          ],
        ],
        contact: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern('[0-9]+'),
          ],
        ],
        roles: new FormArray([]),
      });
    } else {
      this.userForm = this.fb.group({
        username: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
          ],
        ],
        contact: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern('[0-9]+'),
          ],
        ],
        roles: new FormArray([]),
      });
    }
  }

  // convenience getter for easy access to form fields
  get form() {
    return this.userForm.controls;
  }

  addUser() {
    console.log(this.userForm.value);

    if (this.isEditMode) {
      this.userService.updateUser(this.userId, this.userForm.value).subscribe(
        (data) => {
          this.toastr.success('Updated successfully with Id: ' + data.userId);
          this.router.navigate(['/user']);
        },
        (error) => {
          console.log(error);
          this.toastr.error('Error: ' + error.error.message);
        }
      );
    } else {
      this.userService.saveUser(this.userForm.value).subscribe(
        (data) => {
          this.toastr.success('Saved successfully with Id: ' + data.userId);
          this.userForm.reset();
        },
        (error) => {
          console.log(error);
          this.toastr.error('Error: ' + error.error.message);
        }
      );
    }
  }

  onCheckChange(event) {
    const formArray: FormArray = this.userForm.get('roles') as FormArray;

    if (event.target.checked) {
      formArray.push(
        this.fb.group({
          name: [event.target.value],
        })
      );
    } else {
      formArray.value.forEach((ctrl, i) => {
        console.log(ctrl.value + ' - ' + i);
        if (ctrl.name === event.target.value) {
          console.log('yes');
          formArray.removeAt(i);
          return;
        }
      });
    }
  }

  close() {
    this.router.navigate(['/user']);
  }
}
