import { supabase } from '@/supabaseClient';

export default async function handler(req, res) {
    const { folder } = req.query;

    const { data, error } = await supabase.storage
        .from('media-library')
        .list(folder, { limit: 100 });

    if (error) return res.status(500).json({ error: error.message });

    res.status(200).json(data);
}
