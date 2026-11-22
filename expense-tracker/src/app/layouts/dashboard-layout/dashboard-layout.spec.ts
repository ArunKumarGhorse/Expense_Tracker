import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { DashboardLayout } from './dashboard-layout';

describe('DashboardLayout', () => {
  let component: DashboardLayout;
  let fixture: ComponentFixture<DashboardLayout>;
  let router: Router;

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardLayout],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardLayout);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear the logged-in user and navigate home when logging out', async () => {
    const storage = new Map<string, string>([
      ['loggedInUser', '{"email":"test@example.com"}'],
    ]);
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
      removeItem: (key: string) => storage.delete(key),
    });
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    component.logout();

    expect(localStorage.getItem('loggedInUser')).toBeNull();
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });
});
