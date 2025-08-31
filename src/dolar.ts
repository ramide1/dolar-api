import { getDolar } from "./request";

const getBlue = async () => {
    try {
        const html = await getDolar();
        if (!html) throw new Error('Error obteniendo html.');
        const dolar: any = html('tr:has(a:contains("Blue"))').first();
        if (!dolar.length) throw new Error('Error obteniendo elemento.');
        const buy = dolar.find('.buy .buy-value').text().trim();
        const sell = dolar.find('.sell .sell-value').text().trim();
        return { buy: buy, sell: sell };
    } catch (error: any) {
        return false;
    }
};

const getBlueSell = async () => {
    try {
        const html = await getDolar();
        if (!html) throw new Error('Error obteniendo html.');
        const dolar: any = html('tr:has(a:contains("Blue"))').first();
        if (!dolar.length) throw new Error('Error obteniendo elemento.');
        return dolar.find('.sell .sell-value').text().trim();
    } catch (error: any) {
        return false;
    }
};

const getBlueBuy = async () => {
    try {
        const html = await getDolar();
        if (!html) throw new Error('Error obteniendo html.');
        const dolar: any = html('tr:has(a:contains("Blue"))').first();
        if (!dolar.length) throw new Error('Error obteniendo dolar.');
        return dolar.find('.buy .buy-value').text().trim();
    } catch (error: any) {
        return false;
    }
};

const getMep = async () => {
    try {
        const html = await getDolar();
        if (!html) throw new Error('Error obteniendo html.');
        const dolar: any = html('tr:has(a:contains("MEP"))').first();
        if (!dolar.length) throw new Error('Error obteniendo elemento.');
        const buy = dolar.find('.buy .buy-value').text().trim();
        const sell = dolar.find('.sell .sell-value').text().trim();
        return { buy: buy, sell: sell };
    } catch (error: any) {
        return false;
    }
};

const getMepSell = async () => {
    try {
        const html = await getDolar();
        if (!html) throw new Error('Error obteniendo html.');
        const dolar: any = html('tr:has(a:contains("MEP"))').first();
        if (!dolar.length) throw new Error('Error obteniendo elemento.');
        return dolar.find('.sell .sell-value').text().trim();
    } catch (error: any) {
        return false;
    }
};

const getMepBuy = async () => {
    try {
        const html = await getDolar();
        if (!html) throw new Error('Error obteniendo html.');
        const dolar: any = html('tr:has(a:contains("MEP"))').first();
        if (!dolar.length) throw new Error('Error obteniendo dolar.');
        return dolar.find('.buy .buy-value').text().trim();
    } catch (error: any) {
        return false;
    }
};

export { getBlue, getBlueSell, getBlueBuy, getMep, getMepBuy, getMepSell };