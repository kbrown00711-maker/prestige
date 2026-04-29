// Simple Puppeteer visual smoke test: open the page and take a screenshot
const puppeteer = require('puppeteer');
const path = require('path');
(async ()=>{
  const browser = await puppeteer.launch({headless:true});
  const page = await browser.newPage();
  const file = 'file:///' + path.resolve(__dirname, '..', 'index.html').replace(/\\/g, '/');
  await page.setViewport({width:1280,height:800});
  await page.goto(file, {waitUntil:'networkidle0'});
  // wait briefly for fonts to load
  await page.waitForTimeout(500);
  await page.screenshot({path:'visual-snapshot.png',fullPage:true});
  console.log('Snapshot saved: visual-snapshot.png');
  await browser.close();
})();
