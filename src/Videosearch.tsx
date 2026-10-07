import { useState } from "react";

const PIXABAY_KEY = "57920864-03926e10ee51f8d2e3412fead";

export default function VideoSearch() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if(!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`https://pixabay.com/api/videos/?key=${PIXABAY_KEY}&q=${encodeURIComponent(query)}&per_page=12&safesearch=true`);
      const data = await res.json();
      setVideos(data.hits || []);
    } catch(e){ console.log(e) }
    setLoading(false);
  };

  return (
    <div style={{ padding:20, maxWidth:750, margin:'auto' }}>
      <h2 style={{textAlign:'center'}}>NWP Free Video Search</h2>
      <p style={{textAlign:'center', color:'#666'}}>All videos are No-Copyright, free to download & post on NWP</p>
      
      <div style={{ display:'flex', gap:10, margin:'20px 0' }}>
        <input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=> e.key==='Enter' && search()} placeholder="Search: nature, abuja, football, dance..." style={{ flex:1, padding:14, borderRadius:10, border:'1px solid #ccc' }} />
        <button onClick={search} style={{ padding:'14px 22px', borderRadius:10, background:'black', color:'white', fontWeight:'bold' }}>{loading?'...':'Search'}</button>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:20 }}>
        {videos.map((v:any)=>(
          <div key={v.id} style={{ border:'1px solid #e5e5e5', borderRadius:14, overflow:'hidden', background:'white' }}>
            <video width="100%" height="230" src={v.videos.medium.url} controls style={{background:'black'}} />
            <div style={{ padding:12, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{fontSize:13, color:'#444'}}>{v.tags.slice(0,40)}</span>
              <a href={v.videos.medium.url} download={`${v.id}-nwp.mp4`} target="_blank" rel="noreferrer" style={{ background:'#0a7e07', color:'white', padding:'10px 16px', borderRadius:8, textDecoration:'none', fontWeight:'bold', fontSize:14 }}>
                ⬇ Download
              </a>
            </div>
          </div>
        ))}
      </div>
      {videos.length===0 && !loading && <p style={{textAlign:'center', marginTop:30, color:'#999'}}>Type something to search free videos</p>}
    </div>
  );
}