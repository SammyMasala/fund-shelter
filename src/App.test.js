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

describe("e2e App Test", () =>{
  const webdriver = require("selenium-webdriver");
  const By = webdriver.By;
  const until = webdriver.until;
  const driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
  driver.get('http://localhost:3000');

  test("Login to main page", async () =>{ 
    const loginData = {
      username: "test-acc",
      password: "112233aabbcc" 
    }  

    const usernameField = await driver.findElement(By.name("username"));
    const passwordField = await driver.findElement(By.name("password"));
    await usernameField.sendKeys(loginData.username);
    await passwordField.sendKeys(loginData.password);   
    await passwordField.submit();
    await driver.wait(until.elementLocated(By.name("value"), 20000));
    driver.quit();
  }, 20000);
});



