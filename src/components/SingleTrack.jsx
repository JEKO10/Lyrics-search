import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function SingleTrack() {
  const [lyrics, setLyrics] = useState([]);
  const [track, setTrack] = useState([]);
  const key = "396e01083953a35374e8be9bf794350a";
  console.log(track);
  const { id } = useParams();

  const fetchLyrics = async () => {
    const response = await fetch(
      `https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=${key}`
    );
    const data = await response.json();
    setLyrics(data.message.body.lyrics);
  };

  const fetchTrack = async () => {
    const response = await fetch(
      `https://api.musixmatch.com/ws/1.1/track.get?track_id=${id}&apikey=${key}`
    );
    const data = await response.json();
    setTrack(data.message.body.track);
  };

  useEffect(() => {
    fetchLyrics();
    fetchTrack();
  }, []);

  return (
    <section className="single">
      <Link to="/">Go back</Link>
      {track !== undefined || lyrics !== undefined ? (
        <div>
          <div>
            <p>
              <strong>{track.track_name} by</strong> {track.artist_name}
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              corporis dolore eius iste voluptatem laudantium cumque sit hic
              autem eveniet repudiandae vitae quod, adipisci harum vero,
              veritatis esse eos incidunt assumenda. Quibusdam non odio quasi,
              voluptatibus facilis architecto soluta cupiditate possimus, optio
              eligendi dignissimos impedit at iusto voluptates totam hic eius
              placeat officiis libero? Sapiente, porro libero. Vitae natus alias
              consequuntur nemo, repellat dolor harum voluptates rerum a vel ab
              quisquam sequi numquam ipsum labore eum dolore odio at nobis?
              Eligendi omnis, vitae alias, saepe placeat recusandae sit iste
              nesciunt ea debitis eveniet atque tempore fugit consequatur odit
              tenetur illum.
            </p>
          </div>
          {track.primary_genres !== undefined ? (
            <ul>
              <li>
                <strong>Album ID:</strong> {track.album_id}
              </li>
              <li>
                <strong>Song Genre:</strong>{" "}
                {
                  track.primary_genres.music_genre_list[0].music_genre
                    .music_genre_name
                }
              </li>
              <li>
                <strong>Explicit content:</strong>{" "}
                {track.explicit === 0 ? "No" : "Yes"}
              </li>
              <li>
                <strong>Date of update:</strong>{" "}
                <Moment format="MM/DD/YYYY">{track.updated_time}</Moment>
              </li>
            </ul>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </section>
  );
}

export default SingleTrack;
