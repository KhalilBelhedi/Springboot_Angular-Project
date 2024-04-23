import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontHomeComponent } from './front/front-home/front-home.component';
import { BackHomeComponent } from './back/back-home/back-home.component';
import { CenventionComponent } from './back/cenvention/cenvention.component';
import { ConventionComponent } from './front/convention/convention.component';
import { ArchiveconventionComponent } from './back/archiveconvention/archiveconvention.component';
import { CurrentStageComponent } from './front/current-stage/current-stage.component';
import { MyconventionsComponent } from './front/myconventions/myconventions.component';
import { ReclamationComponent } from './components/Reclamationn/reclamation/reclamation.component';
import {MatIconModule} from '@angular/material/icon';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatSelectModule} from "@angular/material/select";
import {ReponseComponent} from './components/Reponsee/reponse/reponse.component';
import {ReclamationListComponent} from './components/Reclamationn/reclamation-list/reclamation-list.component';
import {ReclamationEditComponent} from './components/Reclamationn/reclamation-edit/reclamation-edit.component';
import {ReponseListComponent} from './components/Reponsee/reponse-list/reponse-list.component';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {UserManagementComponentComponent} from './back/UserComponents/user-management-component/user-management-component.component';
import {ProfileBackComponent} from './back/UserComponents/profile-back/profile-back.component';
import {ToastrModule} from 'ngx-toastr';
import {UpdateUserComponent} from './back/UserComponents/update-user/update-user.component';
import {SujetComponent} from './front/sujet/sujet.component';
import {SujetAjoutComponent} from './back/sujet-ajout/sujet-ajout.component';
import {SujetAfficherComponent} from './back/sujet-afficher/sujet-afficher.component';
import {PostulationComponent} from './front/postulation/postulation.component';
import {AffichPostulationComponent} from './front/affich-postulation/affich-postulation.component';
import {PostulationValiderComponent} from './back/postulation-valider/postulation-valider.component';
import {PostulatiionSujetComponent} from './back/postulatiion-sujet/postulatiion-sujet.component';
import { PostComponent } from './back/post/post.component';
import { PostfComponent } from './front/postf/postf.component';
import { MypostsComponent } from './front/myposts/myposts.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './back/nav-bar/nav-bar.component';
import { NavBarFrontComponent } from './front/nav-bar-front/nav-bar-front.component';
import { JournalComponent } from './back/journal/journal.component';
import { JournalstudentComponent } from './front/journalstudent/journalstudent.component';
import {HttpClientModule} from "@angular/common/http";
import { UpdateTacheDialogComponent } from './front/journalstudent/update-tache-dialog/update-tache-dialog.component';
import { AjoutTacheDialogComponent } from './front/journalstudent/ajout-tache-dialog/ajout-tache-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { GrilleComponent } from './back/grille/grille.component';
import { AjoutGrilleDialogComponent } from './back/grille/ajout-grille-dialog/ajout-grille-dialog.component';
import { UpdateGrilleDialogComponent } from './back/grille/update-grille-dialog/update-grille-dialog.component';
import { JournalencadrantComponent } from './front/journalencadrant/journalencadrant.component';
import { DetailsJournalComponent } from './front/details-journal/details-journal.component';
import { GrilleDetailComponent } from './front/details-journal/grille-detail/grille-detail.component';
import { FileUploadComponent } from './front/file-upload/file-upload.component';
import { ReclamationStatistiqueComponent } from './components/Reclamationn/reclamation-statistique/reclamation-statistique.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReclamationEditUserComponent } from './components/Reclamationn/reclamation-edit-user/reclamation-edit-user.component';
import { ReclamationListUserComponent } from './components/Reclamationn/reclamation-list-user/reclamation-list-user.component';
import { AllFilesComponent } from './back/all-files/all-files.component';
import {AccountsUploaderComponent} from "./back/UserComponents/accounts-uploader/accounts-uploader.component";
import { ReponseEditComponent } from './components/Reponsee/reponse-edit/reponse-edit.component';





function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'GestionStageRealm',
        clientId: 'Front-end',
      },
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: false,
      },
      bearerExcludedUrls: ['/assets'],
    });

}
@NgModule({
  declarations: [
    AppComponent,
    FrontHomeComponent,
    BackHomeComponent,
    LoginComponent,
    NavBarComponent,
    NavBarFrontComponent,
    CenventionComponent,
    ConventionComponent,
    ArchiveconventionComponent,
    CurrentStageComponent,
    MyconventionsComponent,
    ReclamationComponent,
    ReponseComponent,
    ReclamationListComponent,
    ReclamationEditComponent,
    ReponseListComponent,
    NavBarFrontComponent,
    UserManagementComponentComponent,
    LoginComponent,
    ProfileBackComponent,
    UpdateUserComponent,
    LoginComponent,
    NavBarComponent,
    NavBarFrontComponent,
    SujetComponent,
    SujetAjoutComponent,
    SujetAfficherComponent,
    PostulationComponent,
    AffichPostulationComponent,
    PostulationValiderComponent,
    PostulatiionSujetComponent,
    PostComponent,
    PostfComponent,
    MypostsComponent,
    NavBarFrontComponent,
    JournalComponent,
    JournalstudentComponent,
    UpdateTacheDialogComponent,
    AjoutTacheDialogComponent,
    GrilleComponent,
    AjoutGrilleDialogComponent,
    UpdateGrilleDialogComponent,
    JournalComponent,
    JournalstudentComponent,
    UpdateTacheDialogComponent,
    AjoutTacheDialogComponent,
    GrilleComponent,
    AjoutGrilleDialogComponent,
    UpdateGrilleDialogComponent,
    JournalencadrantComponent,
    DetailsJournalComponent,
    GrilleDetailComponent,
    FileUploadComponent,
    SujetComponent,
    SujetAjoutComponent,
    SujetAfficherComponent,
    PostulationComponent,
    AffichPostulationComponent,
    PostulationValiderComponent,
    PostulatiionSujetComponent,
    FileUploadComponent,
    ReclamationStatistiqueComponent,
    ReclamationEditUserComponent,
    ReclamationListUserComponent,
    AllFilesComponent,
    AccountsUploaderComponent,
    ReponseEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatFormField,
    MatOption,
    MatSelect,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatFormField,
    MatOption,
    MatSelect,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormField,
    KeycloakAngularModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    BrowserModule,
    NgxChartsModule,
    ToastrModule.forRoot({ // Configure Toastr globally
      timeOut: 3000, // Set default timeout for notifications in milliseconds
      positionClass: 'toast-top-right', // Set default position
      preventDuplicates: true, // Prevent duplicate notifications
      progressBar: true // Display a progress bar
    }),
    BrowserAnimationsModule

  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
