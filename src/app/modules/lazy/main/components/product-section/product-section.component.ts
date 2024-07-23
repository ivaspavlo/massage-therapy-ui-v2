import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IContent, IProduct, IResponse } from '@app/interfaces';
import { ContentApiService } from '@app/core/services';
import { CORE_ROUTE_NAMES } from '@app/core/constants';


@Component({
  selector: 'app-product-section',
  templateUrl: './product-section.component.html',
  styleUrls: ['./product-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSectionComponent {

  @Input() products: IProduct[] = [];

  public displayLimit: number = 3;
  public products$!: Observable<IProduct[]>;

  constructor(
    private contentApiService: ContentApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.products$ = this.contentApiService.getContent().pipe(
      catchError(() => of(null)),
      map((res: IResponse<IContent> | null) => res ? res.data.products : [])
    );
  }

  public trackByProductId(index: number, product: IProduct): string {
    return product.id;
  }

  public onShowMore(): void {
    if (this.displayLimit > this.products.length) {
      return;
    }
    this.displayLimit = this.displayLimit + this.displayLimit;
  }

  public onSelectProduct(product: IProduct): void {
    this.router.navigate([CORE_ROUTE_NAMES.PRODUCT], {state: product});
  }
}
