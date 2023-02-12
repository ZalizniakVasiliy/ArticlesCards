import * as React from "react";

export type articleToSearch = {
  matchedArticle: string | undefined;
  handleInput: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
}