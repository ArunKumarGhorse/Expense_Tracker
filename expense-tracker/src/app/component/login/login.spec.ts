import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { vi } from 'vitest';
import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  const router = { navigate: vi.fn() };
  const storage = new Map<string, string>();
  const localStorageMock = {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, value),
    clear: () => storage.clear(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [{ provide: Router, useValue: router }],
    }).compileComponents();

    vi.stubGlobal('localStorage', localStorageMock);
    localStorageMock.clear();
    router.navigate.mockClear();
    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    localStorageMock.clear();
    vi.unstubAllGlobals();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sign up and navigate to the dashboard', () => {
    component.isLogin = false;
    component.name = 'Alex';
    component.email = 'alex@example.com';
    component.password = 'password';

    component.submitForm();

    expect(JSON.parse(localStorage.getItem('loggedInUser')!)).toEqual({
      name: 'Alex',
      email: 'alex@example.com',
      password: 'password',
    });
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
