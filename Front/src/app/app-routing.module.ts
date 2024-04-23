import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FrontHomeComponent} from "./front/front-home/front-home.component";
import {BackHomeComponent} from "./back/back-home/back-home.component";
import {SujetComponent} from './front/sujet/sujet.component';
import {SujetAjoutComponent} from './back/sujet-ajout/sujet-ajout.component';
import {SujetAfficherComponent} from './back/sujet-afficher/sujet-afficher.component';
import {PostulationComponent} from './front/postulation/postulation.component';
import {AffichPostulationComponent} from './front/affich-postulation/affich-postulation.component';
import {PostulationValiderComponent} from './back/postulation-valider/postulation-valider.component';
import {PostulatiionSujetComponent} from './back/postulatiion-sujet/postulatiion-sujet.component';
import {CenventionComponent} from "./back/cenvention/cenvention.component";
import {ConventionComponent} from "./front/convention/convention.component";
import {ArchiveconventionComponent} from "./back/archiveconvention/archiveconvention.component";
import {CurrentStageComponent} from "./front/current-stage/current-stage.component";
import {MyconventionsComponent} from "./front/myconventions/myconventions.component";
import {ReclamationComponent} from "./components/Reclamationn/reclamation/reclamation.component";
import {ReclamationListComponent} from "./components/Reclamationn/reclamation-list/reclamation-list.component";
import {ReclamationEditComponent} from "./components/Reclamationn/reclamation-edit/reclamation-edit.component";
import {ReponseComponent} from "./components/Reponsee/reponse/reponse.component";
import {ReponseListComponent} from "./components/Reponsee/reponse-list/reponse-list.component";
import {AuthGuard} from "./guard/auth.guard";
import {UserManagementComponentComponent} from "./back/UserComponents/user-management-component/user-management-component.component";
import {NavBarComponent} from "./back/nav-bar/nav-bar.component";
import {NavBarFrontComponent} from "./front/nav-bar-front/nav-bar-front.component";
import {LoginComponent} from "./login/login.component";
import {ProfileBackComponent} from "./back/UserComponents/profile-back/profile-back.component";
import {UpdateUserComponent} from "./back/UserComponents/update-user/update-user.component";
import {PostComponent} from "./back/post/post.component";
import {PostfComponent} from "./front/postf/postf.component";
import {MypostsComponent} from "./front/myposts/myposts.component";
import {JournalstudentComponent} from "./front/journalstudent/journalstudent.component";
import {GrilleComponent} from "./back/grille/grille.component";
import {JournalencadrantComponent} from "./front/journalencadrant/journalencadrant.component";
import {DetailsJournalComponent} from "./front/details-journal/details-journal.component";
import { FileUploadComponent } from './front/file-upload/file-upload.component';
import { AllFilesComponent } from './back/all-files/all-files.component';
import {
  ReclamationStatistiqueComponent
} from "./components/Reclamationn/reclamation-statistique/reclamation-statistique.component";
import {
  ReclamationListUserComponent
} from "./components/Reclamationn/reclamation-list-user/reclamation-list-user.component";
import {
  ReclamationEditUserComponent
} from "./components/Reclamationn/reclamation-edit-user/reclamation-edit-user.component";
import {ReponseEditComponent} from "./components/Reponsee/reponse-edit/reponse-edit.component";

const routes: Routes = [


  { path: '', component: LoginComponent },
  { path: 'admins', component: NavBarComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdmin', 'Agentesprit'] },
    children :
      [
        { path: '', component: BackHomeComponent },
        { path: 'add', component: UserManagementComponentComponent },
        { path: 'profile', component: ProfileBackComponent},
        { path : 'update/:email', component: UpdateUserComponent},
        { path: 'reclamationList', component : ReclamationListComponent },
        { path: 'reclamationEdit/:id', component: ReclamationEditComponent },
        { path: 'reponse/:id', component:ReponseComponent},
        { path: 'reponseList', component:ReponseListComponent},
        {path : 'convention', component : CenventionComponent},
        {path: 'archiveC', component : ArchiveconventionComponent},
        {path: 'ajoutsujet', component: SujetAjoutComponent},
        {path: 'validerpostulation', component: PostulationValiderComponent},
        {path: 'reponse', component: ReponseComponent},
        {path: 'grille', component: GrilleComponent},
        { path: 'ajoutsujet', component: SujetAjoutComponent },
        { path: 'affichsujet', component: SujetAfficherComponent },
        { path: 'postulation_sujet/:idsujet', component: PostulatiionSujetComponent },
        { path: 'validerpostulation', component: PostulationValiderComponent },
        { path: 'filepostulation', component: AllFilesComponent },
        { path:'post',component:PostComponent},
        { path: 'reclamationStatistique', component : ReclamationStatistiqueComponent},
        { path: 'reponseEdit', component: ReponseEditComponent},
        {path: 'reponseEdit/:id', component : ReponseEditComponent},
        { path: 'reclamationListUser', component : ReclamationListUserComponent},
        { path: 'reclamationEditUser/:id', component : ReclamationEditUserComponent},
        { path: 'reclamationStatistique', component : ReclamationStatistiqueComponent},

      ]
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    component: NavBarFrontComponent,
    data: {roles: ['etudiant', 'Agententreprise']},
    children:
      [
        {path: '', component: FrontHomeComponent},
        { path: 'reclamation', component : ReclamationComponent },
        {path :'conventionF', component : ConventionComponent},
        {path: 'myconventions', component : MyconventionsComponent},
        {path: 'stage', component : CurrentStageComponent},
        { path:'postf',component:PostfComponent},
        {path: 'affich_postulation', component: AffichPostulationComponent},
        {path :'conventionF', component : ConventionComponent},
        {path: 'sujets', component: SujetComponent},
        { path: 'front/journalstudent/:id', component : JournalstudentComponent},
        { path: 'journalencadrant/:mailEncadrant' , component: JournalencadrantComponent},
        { path: 'journalDetails/:id', component :  DetailsJournalComponent},
        { path:'myposts',component:MypostsComponent},
        { path:'postuler' , component : PostulationComponent },
        { path:'affich_postulation' , component : AffichPostulationComponent },
        { path: 'sujets', component: SujetComponent },
        { path: 'fileupload', component: FileUploadComponent },
        {path: 'postuler/:idsujet', component: PostulationComponent},
        { path: 'affichsujet', component: SujetAfficherComponent },
        { path: 'ajoutsujet', component: SujetAjoutComponent },
        { path: 'postulation_sujet/:idsujet', component: PostulatiionSujetComponent },
        { path: 'reclamation', component : ReclamationComponent },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
