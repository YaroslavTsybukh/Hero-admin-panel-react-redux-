import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    filtersLoadingStatus: 'idle',
    filters: [],
    filteredHero: [],
    filterActive: "all"
}

export const fetchFilters = createAsyncThunk(
    "filters/fetch",
    () => {
        const {request} = useHttp()
        return request("http://localhost:3001/filters")
    }
)

const filters = createSlice({
    name: "filters",
    initialState,
    reducers: {
        activeFilter : (state , action) => {
            state.filterActive = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending , state => {
                state.filtersLoadingStatus = "loading"
            })
            .addCase(fetchFilters.fulfilled , (state , action) => {
                state.filtersLoadingStatus = "idle"
                state.filters = action.payload
            })
            .addDefaultCase((state , action) => {})
    }
})

const {actions , reducer} = filters
export default reducer
export const {
    filtersFetching,
    filtersFetched,
    activeFilter
} = actions