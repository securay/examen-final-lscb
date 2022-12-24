import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Testing show()', () => {
    service.show();
    service.isLoading.asObservable().subscribe((result) => {
      expect(result).toEqual(true);
    })
  });

  it('Testing hide()', () => {
    service.hide();
    service.isLoading.asObservable().subscribe((result) => {
      expect(result).toEqual(false);
    })
  });
});
