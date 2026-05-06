export const initialState = {
  favorites: [],
  recentSearches: [],
}

export default function reducer(state, action) {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return { ...state, favorites: [action.payload, ...state.favorites] }
    case 'REMOVE_FAVORITE':
      return { ...state, favorites: state.favorites.filter(f => f.id !== action.payload) }
    case 'ADD_SEARCH':
      return { ...state, recentSearches: [action.payload, ...state.recentSearches].slice(0, 10) }
    default:
      return state
  }
}