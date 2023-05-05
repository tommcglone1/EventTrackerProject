import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  loginUser: User = new User();
  isCollapsed: boolean = false;
  adminUser : User | null = null;

  constructor(private auth: AuthService, private router: Router){}
  loggedIn() : boolean {
    return this.auth.checkLogin();
  }

  ngOnInit(){
    this.userIsAdmin();
  }

  userIsAdmin() {
    this.auth.getLoggedInUser().subscribe({

      next: (user) =>{if(user.role === "ADMIN"){
        this.adminUser = user;
      }
      },
      error: (nojoy)=>{
        console.error(nojoy)
      }


    })
  }





  login(user: User){
    console.log("Logging in:")
    console.log(user);
    this.auth.login(user.username, user.password).subscribe({
      next: (loggedInUser) => {
        this.router.navigateByUrl('/home');
        this.ngOnInit();
      },
      error: (problem) => {
        console.error('RegisterComponent.register(): Error logging in user:');
        console.error(problem);
      }
    });
  }

  logout(){
    console.log("logging out.")
    this.auth.logout();
    this.router.navigateByUrl('/home');
    this.adminUser = null;
  }
}
