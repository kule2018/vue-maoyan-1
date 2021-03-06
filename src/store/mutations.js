// eslint-disable-next-line no-unused-vars
import storage from 'store'
import filters from '@/config/filters'

export default {
  changeCity (state, city) {
    state.city = city
    storage.set('city', city)
    document.cookie = `ci=${city.id}%2C${encodeURI(city.nm)}`
  },
  updateDetailMovie (state, movie) {
    const { id } = movie
    state.detailMovie = {
      ...state.detailMovie,
      [id]: movie
    }
    return state
  },
  addCityHistory (state, city) {
    state.cityHistory[city.id] = city
    storage.set('cityHistory', state.cityHistory)
  },
  changeDay (state, day) {
    state.day = day
  },
  changeFilter (state, item) {
    state.filters = {
      ...state.filters,
      ...item
    }
  },
  resetFilter (state) {
    state.filters = filters
  },
  initCinemaList (state, data) {
    const { filters } = state
    if (filters.offset === 0) {
      state.cinemaListData = data
      state.cinemas = data.cinemas
    } else {
      state.cinemas = [...state.cinemas, ...data.cinemas]
    }
  },
  emptyCinemaList (state) {
    state.cinemas = []
  },
  saveCityList (state, data) {
    state.cityList = data.letterMap
    storage.set('cityList', data.letterMap)
  },
  updateSearchHistory (state, history) {
    const list = {}
    list[history.type] = history
    state.searchHistory = {
      ...state.searchHistory,
      ...list
    }
    storage.set('searchHistory', state.searchHistory)
  }
}
