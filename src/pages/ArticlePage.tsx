import * as React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {useNavigate, useParams} from "react-router";
import {useAppSelector} from "../hooks/hooks";
import Routes from "../utils/Routes";
import styles from "./HomePage/style.module.scss";
import {articlesData} from "../types/articlesData";

const ArticlePage = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const currentArticle = useAppSelector((state): articlesData | undefined => {
      return state.articlesData.find((article: articlesData, index: number) => index === Number(id));
    }
  );

  const goBack = (): void => {
    navigate(Routes.homePage);
  };

  return (
    currentArticle ?
      (<>
        <img
          className={styles.imageSpecifiedCard}
          src={currentArticle.imageUrl}
          alt='image of an article'
          loading="lazy"
        />
        <Card className={styles.specifiedCard}>
          <CardContent>
            <div className={styles.titleSpecifiedCard}>
              {currentArticle.title}
            </div>
            <div className={styles.summarySpecifiedCard}>
              {currentArticle.summary}
            </div>
          </CardContent>
        </Card>
        <Button size="small"
                sx={{m: "35px 0 45px 150px"}}
                onClick={() => goBack()}
        >
          <span className={styles.arrowPreviousIcon}><KeyboardBackspaceIcon/></span>
          <span className={styles.detailsButton}>Back to homepage</span>
        </Button>
      </>)
      :
      <h1 className={styles.absentCurrentArticle}>There are no articles to display</h1>
  );
};

export default ArticlePage;