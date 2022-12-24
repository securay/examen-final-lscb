import { BreadcrumbEntity } from './breadcrumb-entity';

describe('BreadcrumbEntity', () => {
  it('should create an instance', () => {
    expect(new BreadcrumbEntity(['/'], 'Inicio', false)).toBeTruthy();
  });
});
