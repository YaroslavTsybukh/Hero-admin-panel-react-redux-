const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filtersLoadingStatus: 'idle',
    filters: [],
    filteredHero: [],
    filterActive: "all"
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'DELETE_HERO':
            const newHeroes = state.heroes.filter(hero => hero.id !== action.payload)
            return {
                ...state,
                heroes: newHeroes,
                filteredHero: newHeroes
            }
        case "CREATE_HERO":
            return {
                ...state,
                heroes: [...state.heroes , action.payload],
                filteredHero: [...state.heroes , action.payload]
            }
        case "FILTERS_FETCHING":
            return {
                ...state,
                filtersLoadingStatus: "loading"
            }
        case "FILTERS_FETCHED":
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: "idle",
                filteredHero: state.filterActive === "all" ? state.heroes : state.heroes.filter(hero => hero.element === action.filterActive)
            }
        case "ACTIVE_FILTER":
            const newArr = state.heroes.filter(hero => hero.element === action.payload)
            return {
                ...state,
                filteredHero: action.payload === "all"? state.heroes : newArr,
                filterActive: action.payload
            }
        default: return state
    }
}

export default reducer;