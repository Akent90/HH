import React from "react";
import { SearchProvider, WithSearch } from "@elastic/react-search-ui";
import { SearchBox, Results, Paging } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import { config } from "../config/elasticsearch";

const SearchBar = () => (
  <SearchProvider config={config}>
    <WithSearch mapContextToProps={({ wasSearched, results }) => ({ wasSearched, results })}>
      {({ wasSearched, results }) => (
        <div>
          <SearchBox autocompleteSuggestions={true} />
          {wasSearched && (
            <div>
              <Results titleField="name" urlField="imageUrl" />
              <Paging />
            </div>
          )}
        </div>
      )}
    </WithSearch>
  </SearchProvider>
);

export default SearchBar;


