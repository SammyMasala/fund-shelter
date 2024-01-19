//E2E TEST: App

// const getElementByName = async (driver, name, timeout = 2000) => {
//   const el = await driver.wait(until.elementsLocated(By.name(name)), timeout);
//   return await driver.wait(until.elementIsVisible(el).timeout); 
// }; 

describe("e2e App Test", () =>{
  const webdriver = require("selenium-webdriver");
  const By = webdriver.By;
  const until = webdriver.until;


  test("Login should work with test loginData", async () =>{ 
    const driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
    driver.get('http://localhost:3000');
  
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



