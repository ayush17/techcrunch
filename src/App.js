import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Triangle } from "react-loader-spinner";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      axios
        .get(
          `https://techcrunch.com/wp-json/wp/v2/posts?per_page=20&context=embed`
        )
        .then((response) => {
          const articlesData = response.data;
          setArticles(articlesData);
          setLoader(false);
        });
    }, 1000);
  }, []);
  return (
    <div className="App" style={{}}>
      {/* card */}
      {!loader ? (
        articles.map((article) => {
          return (
            <Card className="card">
              <CardMedia
                sx={{ height: 140 }}
                image={article.jetpack_featured_media_url}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {article.title.rendered}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {article.excerpt.rendered}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  href="www.google.com"
                  target="_blank"
                  style={{ position: "absolute", bottom: "1px" }}
                >
                  <a href={article.link} target="_blank">
                    Learn More!
                  </a>
                </Button>
              </CardActions>
            </Card>
          );
        })
      ) : (
        <div>
          <Triangle
            height="280"
            width="280"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
          <h1>Loading...</h1>
        </div>
      )}

      {/* Card */}
    </div>
  );
}

export default App;
