import { startBrowser, startPage, stopBrowser, reloadPage } from './browser';
import express from 'express';
import 'dotenv/config';

const appPort: number = parseInt((process.env.APPPORT !== undefined) ? process.env.APPPORT : '3000');
const appEndpoint: string = (process.env.APPENDPOINT !== undefined) ? process.env.APPENDPOINT : '';
const browserPath: string = (process.env.BROWSERPATH !== undefined) ? process.env.BROWSERPATH : '';
let browser: any = false;
let page: any = false;

const functionAttempts = async (functionAttempt: any) => {
    const maxAttempts = 3;
    let attempts = 0;
    while (attempts < maxAttempts) {
        try {
            return await functionAttempt();
        } catch (error: any) {
            attempts++;
            if (attempts < maxAttempts) await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
    return false;
};

const startService = async () => {
    try {
        if (browser && page) throw new Error('Navegador y pagina ya iniciados.');
        await functionAttempts(async () => {
            browser = await startBrowser(browserPath);
            return browser;
        });
        if (!browser) throw new Error('Navegador no iniciado.');
        await functionAttempts(async () => {
            page = await startPage(browser, 'https://dolarhoy.com/');
            return page;
        });
        if (!page) throw new Error('Pagina no iniciada.');
        return true;
    } catch (error: any) {
        console.error('Error iniciando servicio: ', error.message);
        return false;
    }
};

const stopService = async () => {
    try {
        if (!browser) throw new Error('Navegador no iniciado.');
        await stopBrowser(browser);
        return true;
    } catch (error: any) {
        return false;
    }
};

const app: any = express();
app.use(express.json());

app.get('/' + appEndpoint + 'blue', async (_req: any, res: any) => {
    try {
        if (!browser) throw new Error('Navegador no iniciado.');
        if (!page) throw new Error('Pagina no iniciada.');
        await reloadPage(page);
        const textSelectorBuy = await page.waitForSelector('.tile.dolar .tile.is-parent.is-5 .compra .val');
        const fullTitleBuy = await textSelectorBuy?.evaluate((el: any) => el.textContent);
        const textSelectorSell = await page.waitForSelector('.tile.dolar .tile.is-parent.is-5 .venta .val');
        const fullTitleSell = await textSelectorSell?.evaluate((el: any) => el.textContent);
        res.json({ error: false, message: 'Obtenido con éxito.', data: { buy: fullTitleBuy, sell: fullTitleSell } });
    } catch (error: any) {
        res.status(500).json({ error: true, message: error.message });
    }
});

app.get('/' + appEndpoint + 'blue-sell', async (_req: any, res: any) => {
    try {
        if (!browser) throw new Error('Navegador no iniciado.');
        if (!page) throw new Error('Pagina no iniciada.');
        await reloadPage(page);
        const textSelector = await page.waitForSelector('.tile.dolar .tile.is-parent.is-5 .venta .val');
        const fullTitle = await textSelector?.evaluate((el: any) => el.textContent);
        res.json({ error: false, message: 'Obtenido con éxito.', data: fullTitle });
    } catch (error: any) {
        res.status(500).json({ error: true, message: error.message });
    }
});

app.get('/' + appEndpoint + 'blue-buy', async (_req: any, res: any) => {
    try {
        if (!browser) throw new Error('Navegador no iniciado.');
        if (!page) throw new Error('Pagina no iniciada.');
        await reloadPage(page);
        const textSelector = await page.waitForSelector('.tile.dolar .tile.is-parent.is-5 .compra .val');
        const fullTitle = await textSelector?.evaluate((el: any) => el.textContent);
        res.json({ error: false, message: 'Obtenido con éxito.', data: fullTitle });
    } catch (error: any) {
        res.status(500).json({ error: true, message: error.message });
    }
});

app.listen(appPort, async () => {
    await startService();
    console.log('App escuchando en el puerto ' + appPort);
});

process.on('SIGTERM', () => {
    console.log('Deteniendo servicio.');
    stopService();
});

process.on('SIGINT', () => {
    console.log('Deteniendo servicio.');
    stopService();
});