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

const SITE_URL = 'http://localhost:3000'

describe("e2e App Test", () =>{
  const webdriver = require("selenium-webdriver");
  const By = webdriver.By;
  const until = webdriver.until;
  const driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
  driver.manage().setTimeouts({ implicit:2000 })

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
  }, 20000);

  test("User sees Shelter List", async() => {
    driver.get(SITE_URL);
    await driver.findElement(By.css("div[class='view-shelter']"));
    await driver.findElement(By.css("div[class='shelter-list']"));
  });

  test("User sees View-Editor", async() => {
    driver.get(SITE_URL);
    await driver.findElement(By.css("div[class='view-editor']"));
    await driver.findElement(By.css("div[class='editor-header']"));
    await driver.findElement(By.css("div[class='editor-hero']"));
    await driver.findElement(By.css("div[class='hero-visualizer']"));
    await driver.findElement(By.css("div[class='editor-expenses']"));
    await driver.findElement(By.css("div[class='expenses-list']"));
  });

  test("User creates Expense", async () =>{
    driver.get(SITE_URL);
    const expenseValueField = await driver.findElement(By.css("input[name='value']"));
    const expenseDescField = await driver.findElement(By.css("input[name='description']"));

    await expenseValueField.sendKeys("112233");
    await expenseDescField.sendKeys("test");
    await expenseDescField.submit();
  })

  test("User Signs Out", async() => {
    driver.get(SITE_URL);
    const signOutBtn = await driver.findElement(By.css("button[id='button-signout']"));
    await signOutBtn.click();

    await driver.wait(until.elementLocated(By.css("input[name='username']"), 20000));    
  });

  it("Ends test", () => {
    driver.quit();
  })
});



