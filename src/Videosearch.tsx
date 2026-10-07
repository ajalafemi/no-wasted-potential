import { useState } from "react";

const YT_KEY = "PUT_YOUR_YOUTUBE_API_KEY";
const PEXELS_KEY = "PUT_YOUR_PEXELS_API_KEY"; // free from pexels.com/api - this is for legal downloads

export default function VideoSearch() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState<any[]>([]);

  const search = async () => {
    if(!query) return;
    // 1. Search YouTube but ONLY Creative Commons (no copyright)
    const ytRes = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&q=${query}&type=video&videoLicense=creativeCommon&key=${YT_KEY}`);
    const ytData = await ytRes.json();

    // 2. Search Pexels for free-to-download videos
    const pexRes = await fetch(`https://api.pexels.com/videos/search?query=${query}&per_page=8`, {
      headers: { Authorization: PEXELS_KEY }
    });
    const pexData = await pexRes.json();

    setVideos([
     ...(ytData.items || []).map((v:any)=>({ id: v.id.videoId, title: v.snippet.title, type: 'yt', embed: `https://www.youtube.com/embed/${v.id.videoId}` })),
     ...(pexData.videos || []).map((v:any)=>({ id: v.id, title: `Pexels - ${query}`, type: 'pexels', embed: v.video_files[0].link, download: v.video_files[0].link }))
    ]);
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display:'flex', gap:10 }}>
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search any video..." style={{ flex:1, padding:12, borderRadius:8 }} />
        <button onClick={search} style={{ padding:'12px 20px', borderRadius:8, background:'black', color:'white' }}>Search</button>
      </div>

      <div style={{ display:'grid', gap:15, marginTop:20 }}>
        {videos.map(v=>(
          <div key={v.id} style={{ border:'1px solid #333', borderRadius:12, overflow:'hidden', padding:10 }}>
            <p style={{ fontWeight:'bold' }}>{v.title}</p>
            {v.type === 'yt'?
              <iframe width="100%" height="200" src={v.embed} allowFullScreen /> :
              <video width="100%" height="200" src={v.embed} controls />
            }
            {/* Download only for Pexels / no-copyright */}
            {v.type === 'pexels' && v.download && (
              <a href={v.download} download style={{ display:'block', marginTop:10, textAlign:'center', background:'green', color:'white', padding:10, borderRadius:8, textDecoration:'none' }}>Download (No Copyright)</a>
            )}
            {v.type === 'yt' && <small style={{color:'gray'}}>Creative Commons - Watch only (YouTube TOS forbids download)</small>}
          </div>
        ))}
      </div>
    </div>
  );
}