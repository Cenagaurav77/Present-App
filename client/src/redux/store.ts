import { configureStore } from '@reduxjs/toolkit'
import utilReducer from './editor/utilSlice'
import editorReducer from './editor/editorSlice'

export default configureStore({
  reducer: {
    editor: editorReducer,
    util: utilReducer,
  },
})
