import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeCvGithubComponent } from './make-cv-github.component';

describe('MakeCvGithubComponent', () => {
  let component: MakeCvGithubComponent;
  let fixture: ComponentFixture<MakeCvGithubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeCvGithubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeCvGithubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
