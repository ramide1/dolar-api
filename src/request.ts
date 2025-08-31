import * as cheerio from 'cheerio';

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

const getDolar = async () => {
    try {
        let response: any = false;
        await functionAttempts(async () => {
            response = await fetch('https://www.cronista.com/MercadosOnline/dolar.html', { method: 'GET' });
            return response;
        });
        const text = await response.text();
        return cheerio.load(text);
    } catch (error: any) {
        return false;
    }
};

export { getDolar };