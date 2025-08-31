import express from 'express';
import 'dotenv/config';
import { getBlue, getBlueSell, getBlueBuy, getMep, getMepBuy, getMepSell } from './dolar';

const appPort: number = parseInt((process.env.APPPORT !== undefined) ? process.env.APPPORT : '3000');
const appEndpoint: string = (process.env.APPENDPOINT !== undefined) ? process.env.APPENDPOINT : '';

const app: any = express();
app.use(express.json());

app.get('/' + appEndpoint + 'blue', async (_req: any, res: any) => {
    try {
        const dolar = await getBlue();
        if (!dolar) throw new Error('Error obteniendo dolar.');
        res.json({ error: false, message: 'Obtenido con éxito.', data: { buy: dolar.buy, sell: dolar.sell } });
    } catch (error: any) {
        res.status(500).json({ error: true, message: error.message });
    }
});

app.get('/' + appEndpoint + 'blue-sell', async (_req: any, res: any) => {
    try {
        const dolar = await getBlueSell();
        if (!dolar) throw new Error('Error obteniendo dolar.');
        res.json({ error: false, message: 'Obtenido con éxito.', data: dolar });
    } catch (error: any) {
        res.status(500).json({ error: true, message: error.message });
    }
});

app.get('/' + appEndpoint + 'blue-buy', async (_req: any, res: any) => {
    try {
        const dolar = await getBlueBuy();
        if (!dolar) throw new Error('Error obteniendo dolar.');
        res.json({ error: false, message: 'Obtenido con éxito.', data: dolar });
    } catch (error: any) {
        res.status(500).json({ error: true, message: error.message });
    }
});

app.get('/' + appEndpoint + 'mep', async (_req: any, res: any) => {
    try {
        const dolar = await getMep();
        if (!dolar) throw new Error('Error obteniendo dolar.');
        res.json({ error: false, message: 'Obtenido con éxito.', data: { buy: dolar.buy, sell: dolar.sell } });
    } catch (error: any) {
        res.status(500).json({ error: true, message: error.message });
    }
});

app.get('/' + appEndpoint + 'mep-sell', async (_req: any, res: any) => {
    try {
        const dolar = await getMepSell();
        if (!dolar) throw new Error('Error obteniendo dolar.');
        res.json({ error: false, message: 'Obtenido con éxito.', data: dolar });
    } catch (error: any) {
        res.status(500).json({ error: true, message: error.message });
    }
});

app.get('/' + appEndpoint + 'mep-buy', async (_req: any, res: any) => {
    try {
        const dolar = await getMepBuy();
        if (!dolar) throw new Error('Error obteniendo dolar.');
        res.json({ error: false, message: 'Obtenido con éxito.', data: dolar });
    } catch (error: any) {
        res.status(500).json({ error: true, message: error.message });
    }
});

app.listen(appPort, () => {
    console.log('App escuchando en el puerto ' + appPort);
});