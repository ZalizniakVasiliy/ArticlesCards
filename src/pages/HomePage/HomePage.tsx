import {useGetArticlesDataQuery} from "../../store/spaceFlightApi";
import React, {useRef} from "react";
import ProgressLoader from "../../assets/ProgressLoader";
import Divider from '@mui/material/Divider';
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import {useNavigate} from "react-router";
import Routes from "../../utils/Routes";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {addArticlesList} from "../../store/slices/articles";
import SearchArticles from "../../components/SearchArticles";
import ArticleCard from "../../components/ArticleCard";
import styles from './style.module.scss';
import {articlesData} from "../../types/articlesData";

const HomePage = () => {
  const matchedArticle = useRef<string | undefined>();
  const {data, isLoading} = useGetArticlesDataQuery(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selector = useAppSelector(state => state.articlesData);

  if (isLoading) return <ProgressLoader/>;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    matchedArticle.current = e.target.value;
  };

  const stringToArray = (value: string | undefined): string[] => {
    if (value) {
      return value.replace(/[^a-zA-Z ]/g, "").trim().toLowerCase().split(' ');
    }
    return [];
  };

  const getFilteredArticles = (articlesArray: articlesData[],
                               searchValue: string | undefined,
                               descriptionChapter: string): articlesData[] => {
    return articlesArray.filter((article) => {
      const descriptionChapterArray = stringToArray(article[descriptionChapter as keyof articlesData]);
      const searchValueArray = stringToArray(searchValue);
      const arr = searchValueArray.filter((item: string) => descriptionChapterArray.includes(item));
      if (arr.length) {
        return article;
      }
    });
  };

  const makeSortedArticles = (filteredArticlesArray: articlesData[],
                              keyWords: string | undefined,
                              descriptionChapter: string): articlesData[][] => {
    const keyWordsArr = stringToArray(keyWords);
    return keyWordsArr.map((item: string) => {
      return filteredArticlesArray.sort((current: articlesData, next: articlesData) => {
        const currentArticle = stringToArray(current[descriptionChapter]);
        const nextArticle = stringToArray(next[descriptionChapter]);
        return currentArticle.indexOf(item) - nextArticle.indexOf(item);
      });
    });
  };

  const getHighlightedText = (text: string,
                              highlightText: string | undefined,
                              highlightedItemClass: string): string => {
    if (highlightText) {
      return highlightText.split(' ').reduce((accum: string, item: string) => {
        const textParts = accum.split(' ');
        const res = textParts.map((part: string) => {
          if (part.toLowerCase().split(/[!@#$%^&*)(+=.<>{}\[\]:;'"|~`_\-,’‘—]/g).includes(item.toLowerCase())) {
            return `<span class='${highlightedItemClass}'>${part}</span>`;
          }
          return part;
        });
        accum = res.join(' ');
        return accum;
      }, text);
    }
    return text;
  };

  const handleSearch = () => {
    const articlesByTitleToView = getFilteredArticles(data, matchedArticle.current, 'title');
    const articlesBySummaryToView = getFilteredArticles(data, matchedArticle.current, 'summary');
    makeSortedArticles(articlesByTitleToView, matchedArticle.current, 'title');
    makeSortedArticles(articlesBySummaryToView, matchedArticle.current, 'summary');
    const resultsArray = [...articlesByTitleToView, ...articlesBySummaryToView];

    dispatch(addArticlesList(resultsArray));
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      matchedArticle.current = (event.target as HTMLInputElement).value;
      handleSearch();
    }
  };

  const handleNavigate = (index: number): void => {
    navigate(Routes.specifiedArticles + index);
  };

  return (
    <Box className={styles.box}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={8} md={6}>
          <SearchArticles
            handleKeyUp={handleKeyUp}
            handleInput={handleInput}
            handleSearch={handleSearch}
            matchedArticle={matchedArticle.current}
          />
        </Grid>
      </Grid>
      <div className={styles.divider}>
        <span>Results: {selector.length}</span>
        <Divider/>
      </div>
      <Grid container spacing={5.5}>
        {selector.map((item: articlesData, index: number) => (
          <Grid item xs={12} sm={6} md={4} key={index}
          >
            <ArticleCard
              index={index}
              item={item}
              matchedArticle={matchedArticle.current}
              handleNavigate={handleNavigate}
              getHighlightedText={getHighlightedText}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
};

export default HomePage;