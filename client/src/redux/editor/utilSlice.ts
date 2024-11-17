import { UtilState, TElement, TLayer, TPage } from '@/shared/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState: UtilState = {
  mouse: {
    elementRelative: {
      x: 0,
      y: 0,
    },
  },
}

export const utilSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setMouseCoords: (state: UtilState, action) => {
      const { payload } = action

      const { x, y } = payload

      return {
        ...state,
        mouse: {
          elementRelative: {
            x,
            y,
          },
        },
      }
    },
  },
})

export const { setMouseCoords } = utilSlice.actions

export default utilSlice.reducer
