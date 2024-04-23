import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserServiceService} from "../../../Services/UserService/user-service.service";
import {User, UserWrapper} from "../../../Modules/UserModule/User";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit{
  message: string = "";
  Id_user: number = 0 ;
  private email: any;
  private UserWrapper: any = {} as UserWrapper;
  userForm: FormGroup;
  showRoleEntrepriseFields = false;
  showEtudiantFields = false;

  constructor(private activeRoute: ActivatedRoute,
              private UserService: UserServiceService,
              private router: Router ,
              private fb: FormBuilder,
              private toastr: ToastrService) {
    this.userForm = this.fb.group({});

  }
  ngOnInit(): void {
    this.userForm = this.fb.group({
      login: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: [''],
      lastName: [''],
      role: ['', Validators.required],
      role_entreprise: [''],
      identifiant: [''],
      classe: [''],
      specialite: ['']
    });
    this.email = this.activeRoute.snapshot.params['email'];
    this.UserService.getUserWarpperByEmail(this.email).subscribe(user => {
      this.Id_user =  user.user.id_User;
      this.UserWrapper = user;
      console.log("id user : " + this.Id_user);
        //this.userForm.setValue(this.UserWrapper.user); // cant cause id
       this.userForm.patchValue({
        login: this.UserWrapper.user.login, // Assuming 'login' exists in user.user
        email: this.UserWrapper.user.email,  // Assuming 'email' exists in user.user
        firstName: this.UserWrapper.user.firstName, // Assuming 'firstName' exists in user.user
        lastName: this.UserWrapper.user.lastName, // Assuming 'lastName' exists in user.user
        role: this.UserWrapper.user.role, // Assuming 'role' exists in user.user
        role_entreprise: this.UserWrapper.user.role_entreprise, // Assuming 'role_entreprise' exists in user.user
        identifiant: this.UserWrapper.user.identifiant, // Assuming 'identifiant' exists in user.user
        classe: this.UserWrapper.user.classe, // Assuming 'classe' exists in user.user
        specialite: this.UserWrapper.user.specialite, // Assuming 'specialite' exists in user.user
      });
      // @ts-ignore
      this.userForm.get('role').valueChanges.subscribe(value => {
        this.toggleFields(value);
      });
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      // Handle form submission
      let u: User = this.userForm.value;
      u.id_User = this.Id_user;
      console.log("user id : " + u.id_User);
      this.UserService.updateUser(u,  this.userForm.value.role, this.userForm.value.firstName, this.userForm.value.lastName).subscribe(
        response => {
          if (response.success) {
            console.log(response.message);
            this.message = response.message;
            this.toastr.success(response.message, 'Success');
            this.router.navigate(['/admins']);
          } else {
            console.log(response.message);
            this.message = response.message;
            this.toastr.error(response.message, 'Error');
          }
        }
      );
    }

  }

  toggleFields(role: string): void {
    this.showRoleEntrepriseFields = role === 'Agententreprise';
    this.showEtudiantFields = role === 'etudiant';
  }

}
