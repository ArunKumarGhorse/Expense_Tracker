
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  isLogin = true;

  name = '';
  email = '';
  password = '';

  constructor(private router: Router) {}

  submitForm() {

    const users = JSON.parse(
      localStorage.getItem('users') || '[]'
    );

    if (this.isLogin) {

      const user = users.find(
        (u: any) =>
          u.email === this.email &&
          u.password === this.password
      );

      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        this.router.navigate(['/dashboard']);
      } else {
        alert('Invalid Email or Password');
      }

    } else {

      const exists = users.find(
        (u: any) => u.email === this.email
      );

      if (exists) {
        alert('Email already registered');
        return;
      }

      const newUser = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      users.push(newUser);

      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('loggedInUser', JSON.stringify(newUser));
      this.router.navigate(['/dashboard']);

    }
  }
}
