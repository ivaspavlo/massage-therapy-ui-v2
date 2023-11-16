import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { INPUT_TYPES } from '@app/core/constants';
import { DialogService } from '@app/modules/ui/dialog';
import { DestroySubscriptions } from '@app/shared/classes';

import { TeamModalComponent } from './team-modal/team-modal.component';
import { UpdatesModalComponent } from './updates-modal/updates-modal.component';
import { CertModalComponent } from './cert-modal/cert-modal.component';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent extends DestroySubscriptions implements OnInit {

  public formGroup!: FormGroup;
  public controlName: string = 'newsletter';
  public currentYear: string = '';
  public INPUT_TYPES = INPUT_TYPES;

  private testDialogConfig = {
    test: 'TEST'
  };

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private readonly fb: FormBuilder,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      [this.controlName]: this.fb.control('', [Validators.required, Validators.email])
    });
    this.currentYear = `${new Date().getFullYear()}`;
  }

  public onClickBrand(): void {
    this.document.body.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public onShowTeamModal(): void {
    this.dialogService.open(TeamModalComponent, this.testDialogConfig).afterClosed.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(() => {
      console.log('works');
    });
  }

  public onShowUpdates(): void {
    this.dialogService.open(UpdatesModalComponent, this.testDialogConfig);
  }

  public onShowCertificates(): void {
    this.dialogService.open(CertModalComponent, this.testDialogConfig);
  }

}