import puppeteer from 'puppeteer';

const startBrowser = async (executablePath: string = '') => {
    try {
        const options: any = { headless: true, args: ['--no-sandbox'] };
        if (executablePath !== '') options.executablePath = executablePath;
        return await puppeteer.launch(options);
    } catch (error: any) {
        return false;
    }
}

const startPage = async (browser: any, url: string) => {
    try {
        const page = await browser.newPage();
        await page.goto(url);
        await page.setViewport({ width: 1080, height: 1024 });
        return page;
    } catch (error: any) {
        return false;
    }
}

const stopBrowser = async (browser: any) => {
    try {
        await browser.close();
        return true;
    } catch (error: any) {
        return false;
    }
}

const reloadPage = async (page: any) => {
    try {
        await page.reload();
        return true;
    } catch (error: any) {
        return false;
    }
}

export { startBrowser, startPage, stopBrowser, reloadPage };