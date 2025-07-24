import { useState } from "react";

const EmbedYoutube = ({ embed }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="embed-preview">
      {!loaded ? (
        <div onClick={() => setLoaded(true)} style={{ cursor: 'pointer' }}>
          <img src={embed.thumbnail_url} alt={embed.title} style={{ width: '100%', borderRadius: '8px' }} />
          <div style={{background: 'red'}}>▶</div>
          {embed.duration && <div className="duration">{embed.duration}</div>}
          <p><strong>{embed.title}</strong><br/><small>{embed.author}</small></p>
        </div>
      ) : (
        <iframe
            title={embed.title}
          src={embed.meta.embed_url}
          width="100%"
          height="315"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
};

export default EmbedYoutube;