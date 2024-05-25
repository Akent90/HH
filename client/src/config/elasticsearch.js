import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import moment from "moment";

const connector = new AppSearchAPIConnector({
  searchKey: process.env.REACT_APP_SEARCH_KEY,
  engineName: process.env.REACT_APP_SEARCH_ENGINE_NAME,
  endpointBase: process.env.REACT_APP_SEARCH_ENDPOINT_BASE 
});

export const config = {
  alwaysSearchOnInitialLoad: true,
  searchQuery: {
    result_fields: {
      name: { raw: {} },
      description: { snippet: { size: 100, fallback: true } },
      imageUrl: { raw: {} },
      price: { raw: {} },
      stock: { raw: {} },
      category: { raw: {} }
    },
    facets: {
      price: {
        type: "range",
        ranges: [
          { from: 0, to: 10, name: "$0 - $10" },
          { from: 10, to: 50, name: "$10 - $50" },
          { from: 50, to: 100, name: "$50 - $100" },
          { from: 100, name: "$100+" }
        ]
      },
      category: { type: "value", size: 30 }
    }
  },
  autocompleteQuery: {
    results: {
      resultsPerPage: 5,
      result_fields: {
        name: { snippet: { size: 100, fallback: true } },
        description: { snippet: { size: 100, fallback: true } }
      }
    },
    suggestions: {
      types: {
        documents: {
          fields: ["name", "description"]
        }
      },
      size: 4
    }
  },
  apiConnector: connector
};
