//E2E TEST: App: STATUS
//1.Login - COMPLETE
//- Input username and password into field
//- Submit to login

//2.Update Month
//- Click month button
//- Input month limit
//- Update
//- See new monthly limit

//3.Submit new expense
//- Input expense value and expense description
//- Submit input
//- New expense appears on expense list

//4.Delete expense
//- Click delete button adjacent to Expense entry
//- Expense is deleted from list
//- List is updated 

//5.View tutorial
//- Click tutorial button
//- Tutorial overlay should be visible
//- Click tutorial button
//- Tutorial overlay should be hidden

//6.Sign out 

// const SITE_URL = 'https://development.d1z6ebx34rsesg.amplifyapp.com'
const SITE_URL = 'http://localhost:3000'

describe("e2e App Test", () =>{
  const webdriver = require("selenium-webdriver");
  const chrome = require('selenium-webdriver/chrome');
  const options = new chrome.Options();
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--no-sandbox');
  // options.addArguments('--headless');
  // options.addArguments("--disable-gpu")
  options.addArguments("disable-infobars")
  options.addArguments("--disable-extensions")

  const By = webdriver.By;
  const until = webdriver.until;
  const driver = new webdriver.Builder().forBrowser(webdriver.Browser.CHROME).setChromeOptions(options).build();
  driver.manage().getTimeouts({implicit: 10000});
  
  test("Login", async () =>{ 
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
    await driver.wait(until.elementLocated(By.name("value")));    
  }, 10000);

  test("Update Month", async () => {
    await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), '200$')]")));
    const monthToggleBtn = await driver.findElement(By.css(".hero-month-toggle"));
    await monthToggleBtn.click();
    const setMonthElem = await driver.findElement(By.css(".hero-month"));
    const limitField = await setMonthElem.findElement(By.css("input"));
    await limitField.sendKeys("200");
    await setMonthElem.findElement(By.css(".amplify-button"));
    await limitField.submit();
    await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), '200$')]")));
  }, 10000);

  test("Submit new Expense", async () =>{
    const newExpensesElem = await driver.findElement(By.css(".editor-expenses"));
    const expenseValueField = await newExpensesElem.findElement(By.css("input[name='value']"));
    const expenseDescField = await newExpensesElem.findElement(By.css("input[name='description']"));

    await expenseValueField.click();
    await expenseValueField.sendKeys("112233");
    await expenseDescField.click();
    await expenseDescField.sendKeys("test");
    await expenseDescField.submit();
    await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), '112233')]")));
  },10000);

  test("Delete Expense", async() =>{
    const expenseElems = await driver.findElements(By.css(".expenses-list-entry"));
    for(let i=0;i<expenseElems.length;i++){
      const deleteBtn = await expenseElems[i].findElement(By.css(".amplify-button"));  
      await deleteBtn.click();
    }
  });

  test("Tutorial Overlay", async() => {
    const tutorialBtn = await driver.findElement(By.css(".header-tutorial"));
    await tutorialBtn.click();
    await driver.findElements(By.css(".tutorial-step visible"));
    await tutorialBtn.click();
    await driver.findElements(By.css(".tutorial-step"));
  });

  test("User Signs Out", async() => {
    const signOutBtn = await driver.findElement(By.css(".header-signout"));
    await signOutBtn.click();
    await driver.wait(until.elementLocated(By.css("input[name='username']")));    
  }, 10000);

  it("Ends test", () => {
    driver.close();
    driver.quit();
  })
});



