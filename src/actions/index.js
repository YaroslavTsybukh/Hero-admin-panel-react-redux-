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

export const filtersFetched = (filters , filterActive) => {
    return {
        type: "FILTERS_FETCHED",
        payload: filters,
        filterActive: filterActive
    }
}

//Active filter
export const activeFilter = (filter) => {
    return {
        type: "ACTIVE_FILTER",
        payload: filter
    }
}