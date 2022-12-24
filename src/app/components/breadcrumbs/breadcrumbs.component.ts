import { Component, Input } from '@angular/core';
import { BreadcrumbEntity } from 'src/app/entities/breadcrumb-entity';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  @Input() paths: BreadcrumbEntity[]= [];
}
