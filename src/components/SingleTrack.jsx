import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function SingleTrack({ loading, setLoading }) {
  const [lyrics, setLyrics] = useState([]);
  const [track, setTrack] = useState([]);
  const key = "396e01083953a35374e8be9bf794350a";
  const { id } = useParams();

  const fetchLyrics = async () => {
    setLoading(true);
    const response = await fetch(
      `https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=${key}`
    );
    const data = await response.json();
    setLyrics(data.message.body.lyrics);
    setLoading(false);
  };

  const fetchTrack = async () => {
    setLoading(track);
    const response = await fetch(
      `https://api.musixmatch.com/ws/1.1/track.get?track_id=${id}&apikey=${key}`
    );
    const data = await response.json();
    setTrack(data.message.body.track);
    setLoading(false);
  };

  useEffect(() => {
    fetchLyrics();
    fetchTrack();
  }, []);

  if (loading) {
    return <div className="loading"></div>;
  } else {
    return (
      <section className="single">
        <Link to="/">Go back</Link>
        {track !== undefined || lyrics !== undefined ? (
          <div>
            <div>
              <p>
                <strong>{track.track_name} by</strong> {track.artist_name}
              </p>
              <p>{lyrics.lyrics_body}</p>
            </div>
            {track.primary_genres !== undefined ? (
              <ul>
                <li>
                  <strong>Album ID:</strong> {track.album_id}
                </li>
                <li>
                  <strong>Song Genre:</strong>{" "}
                  {track.primary_genres.music_genre_list.length !== 0
                    ? track.primary_genres.music_genre_list[0].music_genre
                        .music_genre_name
                    : "No genre found"}
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
}

export default SingleTrack;
