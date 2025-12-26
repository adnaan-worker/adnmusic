import Meting from '../lib/meting.esm.js';

export default async function handler(req, res) {
    // 设置 CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { keyword, server = 'netease', page = 1, limit = 30 } = req.query;

    if (!keyword) {
        return res.status(400).json({ error: '缺少 keyword 参数' });
    }

    try {
        const meting = new Meting(server);
        meting.format(true);
        const result = await meting.search(keyword, { page: Number(page), limit: Number(limit) });
        res.status(200).json(JSON.parse(result));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
