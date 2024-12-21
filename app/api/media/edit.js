import { supabase } from '@/supabaseClient';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { oldPath, newPath } = req.body;

    const { data, error } = await supabase.storage
        .from('media-library')
        .move(oldPath, newPath);

    if (error) return res.status(500).json({ error: error.message });

    res.status(200).json({ message: 'File moved successfully' });
}
