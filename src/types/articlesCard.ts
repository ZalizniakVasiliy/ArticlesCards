import {articlesData} from "./articlesData";

export type articlesCard = {
  index: number;
  item: articlesData;
  matchedArticle: string | undefined;
  handleNavigate: (index: number) => void;
  getHighlightedText: (article: string, matchedArticle: string | undefined, highlightedWord: string) => string;
}