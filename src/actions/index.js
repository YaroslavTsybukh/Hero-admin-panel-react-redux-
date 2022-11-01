//Fetch heroes func for thunk
export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching);
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

//Fetch filters func for thunk
export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching())
    request("http://localhost:3001/filters")
        .then(res => dispatch(filtersFetched(res)))
        .catch(() => console.log("Ошибка fetch filters"))
}

//Fetch heroes
export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

//Delete
export const deleteHero = (id) => {
    return {
        type: 'DELETE_HERO',
        payload:id
    }
}

//Create
export const createHero = (hero) => {
    return {
        type: "CREATE_HERO",
        payload: hero
    }
}

//Fetch filters
export const filtersFetching = () => {
    return {
        type: "FILTERS_FETCHING"
    }
}

export const filtersFetched = (filters) => {
    return {
        type: "FILTERS_FETCHED",
        payload: filters,
    }
}

//Active filter
export const activeFilter = (filter) => {
    return {
        type: "ACTIVE_FILTER",
        payload: filter
    }
}