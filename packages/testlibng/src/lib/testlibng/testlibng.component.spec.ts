import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestlibngComponent } from './testlibng.component';

describe('TestlibngComponent', () => {
  let component: TestlibngComponent;
  let fixture: ComponentFixture<TestlibngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestlibngComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestlibngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
