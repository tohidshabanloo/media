import { supabase } from '@/supabaseClient';

export default async function handler(req, res) {
    const { filePath } = req.query;

    const { signedUrl, error } = await supabase.storage
        .from('media-library')
        .createSignedUrl(filePath, 60); // URL valid for 60 seconds

    if (error) return res.status(500).json({ error: error.message });

    res.status(200).json({ url: signedUrl });
}
