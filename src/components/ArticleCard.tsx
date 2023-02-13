import * as React from 'react';
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import EastIcon from "@mui/icons-material/East";
import Card from "@mui/material/Card";
import styles from '../pages/HomePage/style.module.scss';
import {articlesCard} from "../types/articlesCard";
import {CardActionArea} from '@mui/material';

const ArticleCard = (props: articlesCard) => {
  return (
    <Card className={styles.card}>
      <CardActionArea
        onClick={() => props.handleNavigate(props.index)}>
        <CardMedia
          className={styles.imageCard}
          component="img"
          image={props.item.imageUrl}
          alt='image of an article'
        >
        </CardMedia>
        <CardContent>
          <div
            className={styles.title}
            dangerouslySetInnerHTML={{
              __html: props.getHighlightedText(props.item.title,
                props.matchedArticle,
                styles.highlightedWord)
            }}
          >
          </div>
          <div
            className={styles.summary}
            dangerouslySetInnerHTML={{
              __html: props.getHighlightedText(props.item.summary.length >= 100
                  ? props.item.summary.substring(0, 100).concat("...") : props.item.summary,
                props.matchedArticle,
                styles.highlightedWord)
            }}
          >
          </div>
        </CardContent>
        <div className={styles.referenceWrapper}>
          <span className={styles.detailsButton}>Read more</span>
          <span className={styles.arrowNextIcon}><EastIcon/></span>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default ArticleCard;