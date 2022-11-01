const initialState = {
    filtersLoadingStatus: 'idle',
    filters: [],
    filteredHero: [],
    filterActive: "all"
}

const filters = (state = initialState, action) => {
    switch (action.type) {
        case "FILTERS_FETCHING":
            return {
                ...state,
                filtersLoadingStatus: "loading"
            }
        case "FILTERS_FETCHED":
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: "idle"
            }
        case "ACTIVE_FILTER":
            return {
                ...state,
                filterActive: action.payload
            }
        default: return state
    }
}

export default filters;