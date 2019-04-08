import { AppPage } from './app.po';
import { logging } from 'protractor';
import { browser, by, element, protractor } from 'protractor';
import { async } from 'q';

describe('JOBBHUB App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title', () => {
    page.navigateTo();
    expect(browser.getTitle()).toEqual('Welcome to MuseUI!');
  });

  it('should be redirected to /login route on opening the application', () => {
    expect(browser.getCurrentUrl()).toContain('/login');
  });

  it('should be redirected to /register route', () => {
    browser.element(by.css('.register-button')).click();
    expect(browser.getCurrentUrl()).toContain('/register');
  });

  it('should be able to register user', () => {
    browser.element(by.id('firstName')).sendKeys('sonu');
    browser.element(by.id('lastName')).sendKeys('kumar');
    browser.element(by.id('userId')).sendKeys('sonukrruser');
    browser.element(by.id('password')).sendKeys('Pass@123');
    browser.element(by.css('.register-user')).click();
    expect(browser.getCurrentUrl()).toContain('/login');
  });
  

  it('should be able to login user and navigate to job homepage', () => {
    browser.element(by.id('userIdL')).sendKeys('sonukrruser');
    browser.element(by.id('passwordL')).sendKeys('Pass@123');
    browser.element(by.css('.login-user')).click();
    expect(browser.getCurrentUrl()).toContain('/jobs/homepage');
  });

  it('should be able to search jobs', () => {
    browser.element(by.css('.search-button')).click();
    expect(browser.getCurrentUrl()).toContain('/jobs/search');
    browser.element(by.id('search-button-input')).sendKeys('Account Management');
    browser.element(by.id('search-button-input')).sendKeys(protractor.Key.ENTER);
    const searchItems = element.all(by.css('.job-subtitle'));
    expect(searchItems.count()).toBe(20);
    for(let i = 0; i < 1; i += 1) {
      expect(searchItems.get(i).getText()).toContain('Account');
    }
  });

  it('should be able to add jobs to bookmark', async() => {
    browser.driver.manage().window().maximize();
    browser.driver.sleep(1000);
    const searchItems = element.all(by.css('.job-thumbnail'));
    expect(searchItems.count()).toBe(20);
    searchItems.get(0);
    browser.element(by.css('.addButton')).click();
    browser.driver.sleep(10000);
  });

  it('should be able to view bookmarks and delete jobs', async() => {
    browser.driver.manage().window().maximize();
    browser.driver.sleep(500);
    browser.element(by.id('bkButton')).click();
    const searchItems = element.all(by.css('.job-thumbnail'));
    expect(searchItems.count()).toBe(1);
    searchItems.get(0);
    browser.element(by.css('.deleteButton')).click();
    
  });

  
  it('should be able to logout from application and redirect to login page', () => {
    browser.element(by.css('.logout-btn')).click();
    expect(browser.getCurrentUrl()).toContain('/login');
  });

});
