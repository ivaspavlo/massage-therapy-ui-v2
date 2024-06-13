import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { first, map, shareReplay, tap } from 'rxjs/operators';

import { ToastType } from '@app/core/constants';
import { ToasterService } from '@app/core/services';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss', '../../auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnsubscribeComponent {
  public isUnsubscribed$!: Observable<boolean>;
  private messages = {
    failure: 'main.unsubscribe.failure-reason'
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private toasterService: ToasterService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.isUnsubscribed$ = this.activatedRoute.data.pipe(
      first(),
      map((res: Data) => {
        return typeof res.data?.success === 'boolean'
          ? res.data.success
          : false;
      }),
      tap((res: boolean) => {
        if (!res) {
          return this.toasterService.show(this.translateService.instant(this.messages.failure), ToastType.ERROR);
        }
      }),
      shareReplay()
    );
  }
}
