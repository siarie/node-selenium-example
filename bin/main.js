import { writeFile } from "node:fs";
import { parseArgs, promisify } from "node:util";

import { Builder, Browser, Capabilities } from "selenium-webdriver";

const screenshot = async () => {
	const driver = new Builder().forBrowser("firefox").build();
	await driver.get("https://www.google.com");


	const title = await driver.getTitle();

	const data = await driver.takeScreenshot();
	await promisify(writeFile)(`${title}.png`, data, "base64");
	driver.quit();
};

const pdf = async () => {
	const driver = new Builder().forBrowser("firefox").build();
	await driver.get("https://mitchellh.com/zig/build-internals");

	const title = await driver.getTitle();

	const data = await driver.printPage();
	await promisify(writeFile)(`${title}.pdf`, data, "base64");
	driver.quit();
};

const {values: { type }} = parseArgs({
	options: {
		type: {
			type: "string",
			short: "t"
		}
	}
});

switch(type) {
	case "screenshot":
		screenshot();
		break;
	case "pdf":
		pdf();
		break;
	default:
		console.log("adshajlsfdlsfsdaf");
		break;
}
