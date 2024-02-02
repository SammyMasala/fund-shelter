//E2E TEST: App: STATUS
//1. Login to main page - COMPLETE
//- Input username and password into field
//- Submit to login

//2. Submit new expense
//- Input expense value and expense description
//- Submit input
//- New expense appears on expense list

//3. Delete expense
//- Click delete button adjacent to Expense entry
//- Expense is deleted from list
//- List is updated 

const SITE_URL = 'https://development.d1z6ebx34rsesg.amplifyapp.com'

describe("e2e App Test", () =>{
  const webdriver = require("selenium-webdriver");
  const chrome = require('selenium-webdriver/chrome');
  const options = new chrome.Options();
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--no-sandbox');
  options.addArguments('--headless');
  options.addArguments("--disable-3d-apis")
  options.addArguments("start-maximized")
  options.addArguments("disable-infobars")
  options.addArguments("--disable-extensions")

  const By = webdriver.By;
  const until = webdriver.until;
  const driver = new webdriver.Builder().forBrowser(webdriver.Browser.CHROME).setChromeOptions(options).build();
  driver.manage().getTimeouts({implicit: 20000});
  test("Login to main page", async () =>{ 
    driver.get(SITE_URL);
    const loginData = {
      username: "test-acc",
      password: "112233aabbcc" 
    }  

    const usernameField = await driver.findElement(By.css("input[name='username']"));
    const passwordField = await driver.findElement(By.css("input[name='password']"));
    await usernameField.sendKeys(loginData.username);
    await passwordField.sendKeys(loginData.password);   
    await passwordField.submit();
    await driver.wait(until.elementLocated(By.name("value"), 20000));    
  }, 10000);

  test("User creates Expense", async () =>{
    const expenseValueField = await driver.findElement(By.css("input[name='value']"));
    const expenseDescField = await driver.findElement(By.css("input[name='description']"));

    await expenseValueField.sendKeys("112233");
    await expenseDescField.sendKeys("test");
    await expenseDescField.submit();
  })

  test("User Signs Out", async() => {
    const signOutBtn = await driver.findElement(By.id("button-signout"));
    await signOutBtn.click();

    await driver.wait(until.elementLocated(By.css("input[name='username']"), 10000));    
  }, 20000);

  it("Ends test", () => {
    driver.quit();
  })
});



