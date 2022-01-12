// to import react component
import React, { useEffect, useState } from 'react'
// to import react-youtube package for getting YouTube videos
import YouTube from 'react-youtube';
// to import movie-trailer package to fetch YouTube URL of videos
import movieTrailer from 'movie-trailer';
// to import css styling
import './Trailer.css';

/**
 * Trailer function
 * @param {*} props 
 */

function Trailer(props) {

    // to get TMDB Movie ID
    const movieid = props.movie;
 
    // to set opts value for YouTube package
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
                autoplay: 1,
        },
    };

    // to save YouTube video URL's value v
    const [trailerUrl, setTrailerUrl] = useState("");
   
    useEffect(()=>{
    
        movieTrailer(null, { tmdbId: movieid })
        .then(url => {
    
            const urlParams = new URLSearchParams( new URL(url).search);

            // the value of v i.e. id of the video from its URL
            setTrailerUrl(urlParams.get('v')); 
    
        }).catch(error => console.log(error));
    
    
    }, [movieid]);


    return (
                 <div className="trailer_position">
        {/* show the video only when the trailer url is present */}
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}  
                </div>

    )
}
export default Trailer;