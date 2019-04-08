import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { of } from 'rxjs';

const testConfig = {
  userData: {
    firstName: 'test',
    lastName: 'testLast',
    userId: 'testUser',
    password: 'testPass'
  }
}

fdescribe('RegisterComponent', () => {
  let component:RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let routes:Router;
  let location: Location;
  
  

  class AuthServiceStub {
    currentUser: any;
    
    constructor() {

     }

     registerUser(credentials) {
      if(credentials.userId != testConfig.userData.userId) {
        return of(credentials.userId);
      } else {
        return of(false);
      }
    }
  }

  class dummyComponent {

  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [FormsModule, MatFormFieldModule, MatInputModule,
        MatButtonModule, BrowserAnimationsModule, HttpClientModule,
        RouterTestingModule.withRoutes(
          [{path: 'login', component: dummyComponent}]
        )
      ],
      providers: [{provide: AuthenticationService, useClass: AuthServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    routes = TestBed.get(Router);
    fixture = TestBed.createComponent(RegisterComponent);
    location = TestBed.get(Location);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.debugElement.injector.get(AuthenticationService);
  });

  it('should create register component', async(() => {
    const register = fixture.debugElement.componentInstance;
    expect(register).toBeTruthy();
  }));

  it('should contain four input box for firstname, last name ,userId and password', () => {
    let firstName = fixture.debugElement.query(By.css('.firstName'));
    let lastName = fixture.debugElement.query(By.css('.lastName'));
    let userId = fixture.debugElement.query(By.css('.userId'));
    let password = fixture.debugElement.query(By.css('.password'));
    let registerButton = fixture.debugElement.query(By.css('.register-user'));
  
    
    let firstNameInput  = firstName.nativeElement;
    let lastNameInput = lastName.nativeElement;
    let userIdInput = userId.nativeElement;
    let passwordInput = password.nativeElement;
    let registerButtonInput = registerButton.nativeElement;
   
    expect(firstNameInput).toBeTruthy();
    expect(lastNameInput).toBeTruthy();
    expect(userIdInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(registerButtonInput).toBeTruthy();

  });

  it('should redirect to login page if registered  successfully', async(() => {
    let firstName = fixture.debugElement.query(By.css('.firstName'));
    let lastName = fixture.debugElement.query(By.css('.lastName'));
    let userId = fixture.debugElement.query(By.css('.userId'));
    let password = fixture.debugElement.query(By.css('.password'));
    let registerButton = fixture.debugElement.query(By.css('.register-user'));
  
    
    let firstNameInput  = firstName.nativeElement;
    let lastNameInput = lastName.nativeElement;
    let userIdInput = userId.nativeElement;
    let passwordInput = password.nativeElement;
    let registerButtonInput = registerButton.nativeElement;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      firstNameInput.value = 'sonu';
      lastNameInput.value = 'kumar';
      userIdInput.value = 'sonukrr';
      passwordInput.value = 'sonukrr'
      
      firstNameInput.dispatchEvent(new Event('input'));
      lastNameInput.dispatchEvent(new Event('input'));
      userIdInput.dispatchEvent(new Event('input'));
      passwordInput.dispatchEvent(new Event('input'));

      registerButtonInput.click();
    }).then(() => {
      expect(location.path()).toBe('/login');
    });
  }));
});
