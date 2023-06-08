import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginUser: User = new User();
  failedLogin: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}
  ngOnInit() {}
  login(user: User) {
    console.log('Logging in:');

    this.auth.login(user.username, user.password).subscribe({
      next: (loggedInUser) => {
        this.router.navigateByUrl('/profile');
      },
      error: (problem) => {
        console.error('RegisterComponent.register(): Error logging in user:');
        console.error(problem);
        this.failedLogin = true;
      },
    });
  }

  loggedIn(): boolean {
    return this.auth.checkLogin();
  }
}
