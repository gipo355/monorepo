import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestlibngNosubComponent } from './testlibng-nosub.component';

describe('TestlibngNosubComponent', () => {
  let component: TestlibngNosubComponent;
  let fixture: ComponentFixture<TestlibngNosubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestlibngNosubComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestlibngNosubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
