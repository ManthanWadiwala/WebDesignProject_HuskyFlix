import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Typography, Row, Button } from 'antd';
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, POSTER_SIZE } from '../../Config'
import MainImage from './Sections/MainImage'
import GridCard from '../../commons/GridCards'
import SimpleImageSlider from "react-simple-image-slider";

const { Title } = Typography;
function LandingPage() {
    const buttonRef = useRef(null);

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [Loading, setLoading] = useState(true)
    const [CurrentPage, setCurrentPage] = useState(0);
    const [ImageArr, setImageArr] = useState([]);
    const [backupImg, setBackupImgArr] = useState([])
    const [LandingPage, setLandingPage] = useState(true)
    const [CurrentImageIndex, setCurrentImageIndex] = useState(0);
    let CurrIndex = 0;

    useEffect(() => {
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      fetchMovies(endpoint);
      let tagLatestMovies = document.getElementsByClassName("movie-by-latest");
      for (var i = 0; i < tagLatestMovies.length; i++) {
        tagLatestMovies[i].className += " on-tab-select";
      }
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [])


    const fetchMovies = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                console.log(result)
                // console.log('Movies',...Movies)
                // console.log('result',...result.results)
                setMovies([...Movies, ...result.results]);
                setBackupImgArr([...backupImg, ...result.results])
                setMainMovieImage(MainMovieImage || result.results[0])
                let tempRes = JSON.parse(JSON.stringify(result.results));
                tempRes.sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity));
                ImageArr.splice(0);
                let imagArr = [];
                for(let i=0;i<5;i++) {
                  let obj = {
                    url: IMAGE_BASE_URL + IMAGE_SIZE + tempRes[i].backdrop_path,
                    original_title: tempRes[i].original_title,
                    overview: tempRes[i].overview,
                    movieId: tempRes[i].id,
                  };
                  imagArr.push(obj)
                }
                setImageArr([...ImageArr, ...imagArr]);
                console.log(ImageArr)
                setCurrentPage(result.page)
            }, setLoading(false))
            .catch(error => console.error('Error:', error)
            )
    }
    const loadMoreItems = () => {
        let endpoint = '';
        setLoading(true)
        endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint);
    }

    const handleScroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight - 1) {

            // loadMoreItems()
            console.log('clicked', buttonRef)
            if(buttonRef.current != null){
                buttonRef.current.click();
            }
        }
    }

    const onClick = (idx, event) => {
      console.log(`[App onClick] ${idx} ${event.currentTarget}`,ImageArr);
      window.location.href = `/movie/${ImageArr[idx].movieId}`;
      return null;
    };

    const onClickNav = useCallback((toRight) => {
      if (toRight) {
        CurrIndex = CurrIndex + 1;
        setCurrentImageIndex(CurrIndex);
      } else {
        CurrIndex = CurrIndex - 1
        setCurrentImageIndex(CurrIndex);
      }
    }, []);
  
    const onClickBullets = useCallback((idx) => {
      CurrIndex = idx;
      setCurrentImageIndex(idx);
    }, []);

    const getMovies = (movieType) => {
      setMovies([]);
      setBackupImgArr([]);
      setCurrentImageIndex(0);
      // setImageArr([]);
      ImageArr.splice(0);
      setLoading(true);
      let url = "";
      let tagTabSelect = document.getElementsByClassName("on-tab-select");
      while (tagTabSelect.length)
        tagTabSelect[0].classList.remove("on-tab-select");
      let tagLatestMovies = document.getElementsByClassName("movie-by-latest");
      let tagEnglishMovies = document.getElementsByClassName("movie-by-eng");
      let tagIntMovies = document.getElementsByClassName("movie-by-int");
      let tagKidsMovies = document.getElementsByClassName("movie-by-kid");
      if (movieType === "Latest") {
        url = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        setTabStyle(tagLatestMovies);
      } else if (movieType === "Eng") {
        url = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=2`;
        setTabStyle(tagEnglishMovies);
      } else if (movieType === "Int") {
        url = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=4`;
        setTabStyle(tagIntMovies);
      } else {
        url = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=5`;
        setTabStyle(tagKidsMovies);
      }
      fetchMovies(url);
    };

    const setTabStyle = (tabName) => {
      for (var i = 0; i < tabName.length; i++) {
        tabName[i].className += " on-tab-select";
      }
    }


    return (
      <div style={{ width: "100%", margin: "0" }}>
        {MainMovieImage && !LandingPage && (
          <MainImage
            image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${MainMovieImage.backdrop_path}`}
            title={MainMovieImage.original_title}
            text={MainMovieImage.overview}
          />
        )}
        {ImageArr.length !== 0 && LandingPage && (
          <div>
            <SimpleImageSlider
              width={"100%"}
              height={504}
              loop={true}
              images={ImageArr}
              showBullets={true}
              showNavs={true}
              autoPlay={true}
              onClick={onClick}
              onClickNav={onClickNav}
              onClickBullets={onClickBullets}
              autoPlayDelay={1}
            />
            <div style={{ position: "relative" }}>
              <div className="image-overview"
                style={{
                  position: "absolute",
                  maxWidth: "500px",
                  bottom: "2rem",
                  marginLeft: "2rem",
                }}
              >
                <Title style={{ color: "white" }} level={2}>
                  {" "}
                  {ImageArr[CurrentImageIndex].original_title}{" "}
                </Title>
                <p style={{ color: "white", fontSize: "1rem" }}>
                  {ImageArr[CurrentImageIndex].overview}{" "}
                </p>
              </div>
            </div>
          </div>
        )}

        <div style={{ width: "85%", margin: "1rem auto" }}>
          <div style={{ display: "flex",alignItems:"baseline" }}>
            <Title id="latest" className="movie-by-latest tabs" onClick={() =>getMovies('Latest')} level={3}> Movies by latest </Title>
            <Title id="english" className="movie-by-eng tabs" onClick={() =>getMovies('Eng')}  level={3}> English </Title>
            <Title id="int" className="movie-by-hin tabs" onClick={() =>getMovies('Int')}  level={3}> International </Title>
            <Title id="kids" className="movie-by-kid tabs" onClick={() =>getMovies('Kid')}  level={3}> Kids </Title>
          </div>
          <hr />
          <Row gutter={[16, 16]}>
            {Movies &&
              Movies.map((movie, index) => (
                <React.Fragment key={index}>
                  <GridCard
                    image={
                      movie.poster_path
                        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                        : null
                    }
                    movieId={movie.id}
                    movieName={movie.original_title}
                    overview={movie.overview}
                    rating={movie.vote_average}
                  />
                </React.Fragment>
              ))}
          </Row>

          {Loading && <div>Loading...</div>}

          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              ref={buttonRef}
              className="loadMore"
              onClick={loadMoreItems}
            >
              Load More
            </button>
          </div>
        </div>
      </div>
    );
}

export default LandingPage
