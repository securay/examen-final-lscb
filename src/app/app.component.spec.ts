import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LoaderComponent } from './components/loader/loader.component';

describe('AppComponent', () => {
  let loader: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CommonModule
      ],
      declarations: [
        AppComponent,
        LoaderComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderComponent);
    loader = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'examen-final-lscb'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('examen-final-lscb');
  });

  it('should create', () => {
    expect(loader).toBeTruthy();
  });
});
