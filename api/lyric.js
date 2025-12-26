import Meting from '../lib/meting.esm.js';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { id, server = 'netease' } = req.query;

    if (!id) {
        return res.status(400).json({ error: '缺少 id 参数' });
    }

    try {
        const meting = new Meting(server);
        meting.format(true);
        const result = await meting.lyric(id);
        res.status(200).json(JSON.parse(result));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
