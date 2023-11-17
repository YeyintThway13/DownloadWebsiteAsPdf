const fs = require("fs");
const puppeteer = require("puppeteer");

// Function to download a webpage as a PDF
async function downloadPageAsPDF(url, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the provided URL
  await page.goto(url, { waitUntil: "networkidle2" });

  // Save the webpage as a PDF
  await page.pdf({ path: outputPath, format: "A4" });

  // Close the browser
  await browser.close();
}

// Read URLs from the JSON file
const urlsJson = fs.readFileSync("url.json");
const urls = JSON.parse(urlsJson).urls;

// Download each webpage as a PDF
async function downloadAllPages() {
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const outputFilePath = `${Date.now()}output_${i + 1}.pdf`;

    try {
      await downloadPageAsPDF(url, outputFilePath);
      console.log(`PDF downloaded for ${url}`);
    } catch (error) {
      console.error(`Error downloading PDF for ${url}:`, error);
    }
  }
}

// Run the script
downloadAllPages();
