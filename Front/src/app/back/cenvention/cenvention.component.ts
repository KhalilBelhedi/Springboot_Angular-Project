import { Component } from '@angular/core';
import {Convention} from "../../Modules/ConventionModule/Convention.module";
import {ConventionService} from "../../Services/ConventionService/convention.service";

@Component({
  selector: 'app-cenvention',
  templateUrl: './cenvention.component.html',
  styleUrl: './cenvention.component.css'
})
export class CenventionComponent {
  conventions: Convention[] = [];

  constructor(private conventionService: ConventionService) { }

  ngOnInit() {
    this.conventionService.getConventions().subscribe((data: Convention[]) => {
      this.conventions = data;
    });

  }
  // getConventions(): void {
  //   this.conventionService.getConventions().subscribe(
  //     (data: Convention[]) => {
  //       this.conventions = data;
  //     },
  //     (error) => {
  //       console.error('Error fetching conventions', error);
  //     }
  //   );
  // }
  // getArchivedConventions(): void {
  //   this.conventionService.getArchivedConventions().subscribe(
  //     (data: Convention[]) => {
  //       this.conventions = data;
  //     },
  //     (error) => {
  //       console.error('Error fetching Archived conventions', error);
  //     }
  //   );
  // }

  validateConvention(convention: Convention): void {
    this.conventionService.validateConvention(convention.idConvention).subscribe(
      () => {
        // On success, change the convention's validity status and update the UI
        convention.isvalid = true;
        this.createStagesForValidConventions();

      },
      (error) => {
        console.error('Error validating convention', error);
      }
    );
  }
  createStagesForValidConventions(): void {
    this.conventionService.createStagesForValidConventions().subscribe(
      () => {
        console.log('Stages successfully created for all valid conventions');
      },
      (error) => {
        console.error('Error creating stages for valid conventions', error);
      }
    );
  }
  archiveConvention(convention: Convention): void {
    this.conventionService.archiveConvention(convention.idConvention).subscribe(
      () => {
        // On success, remove the deleted convention from the list
        this.conventions = this.conventions.filter(c => c !== convention);
      },
      (error) => {
        console.error('Error deleting convention', error);
      }
    );
  }



}
