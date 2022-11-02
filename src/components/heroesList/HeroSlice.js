import { createSlice , current , createAsyncThunk , createEntityAdapter} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

export const fetchHeroes = createAsyncThunk(
    "heroes/fetch",
    () => {
        const {request} = useHttp()
        return request("http://localhost:3001/heroes")
    }
)

const heroSlice = createSlice({
    name: "heroes",
    initialState,
    reducers: {
        heroDeleted : (state , action) => {
            state.heroes = state.heroes.filter(hero => hero.id !== action.payload)
        },
        heroCreated : (state , action) => {
            state.heroes.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending , state => {
            state.heroesLoadingStatus = "loading"
        })
            .addCase(fetchHeroes.fulfilled , (state,action) => {
                state.heroesLoadingStatus = 'idle'
                state.heroes = action.payload
            })
            .addCase(fetchHeroes.rejected , state => {
                state.heroesLoadingStatus = "error"
            })
            .addDefaultCase((state,action) => {})
    }
})

const {reducer , actions} = heroSlice

export default reducer
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchedError,
    heroDeleted,
    heroCreated
} = actions