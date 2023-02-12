import * as React from 'react';
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import styles from '../pages/HomePage/style.module.scss';
import {articleToSearch} from "../types/articleToSearch";

const SearchArticles = (props: articleToSearch) => {
  return (
    <>
      <span className={styles.keyWordStyle}>Filter by keywords</span>
      <Paper
        component="form"
        onSubmit={(event) => event.preventDefault()}
        className={styles.paper}
      >
        <IconButton
          type="button"
          aria-label="search"
          onClick={props.handleSearch}
        >
          <SearchIcon/>
        </IconButton>
        <InputBase
          className={styles.input}
          placeholder="Filter by keywords"
          defaultValue={props.matchedArticle}
          onChange={props.handleInput}
          onKeyUp={props.handleKeyUp}
        />
      </Paper>
    </>
  );
};

export default SearchArticles;