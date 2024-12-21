import { supabase } from '@/supabaseClient';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { file, fileName, folder } = req.body;

    const { data, error } = await supabase.storage
        .from('media-library')
        .upload(`${folder}/${fileName}`, file, { contentType: file.type });

    if (error) return res.status(500).json({ error: error.message });

    const { publicUrl } = supabase.storage.from('media-library').getPublicUrl(`${folder}/${fileName}`);
    res.status(200).json({ url: publicUrl });
}
