import puppeteer from 'puppeteer';

const startBrowser = async (executablePath: string = '') => {
    try {
        const options: any = { headless: true, args: ['--no-sandbox'] };
        if (executablePath !== '') options.executablePath = executablePath;
        console.log('Iniciando navegador con opciones: ', options);
        return await puppeteer.launch(options);
    } catch (error: any) {
        console.error('Error iniciando navegador: ', error);
        return false;
    }
}

const startPage = async (browser: any, url: string) => {
    try {
        console.log('Iniciando pagina con: ' + url);
        const page = await browser.newPage();
        await page.goto(url);
        await page.setViewport({ width: 1080, height: 1024 });
        return page;
    } catch (error: any) {
        console.error('Error iniciando pagina: ', error);
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