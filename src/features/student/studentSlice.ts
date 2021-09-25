import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { ListParams, ListResponse, PaginationParams,Students } from "models";


export interface StudentState {
  loading: boolean;
  list: Students[];
  filter: ListParams;
  pagination: PaginationParams;

}

const initialState: StudentState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 20,    
  },
  pagination: {
    _page: 1,
    _limit: 20,
    _totalRows: 20
  }
}

const studentSlice = createSlice ({
  name: 'student',
  initialState: initialState,
  reducers: {
    fetchStudentList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchStudentListSuccess(state, action:PayloadAction<ListResponse<Students>>) {
      state.list = action.payload.data;
      state.pagination =action.payload.pagination;
      state.loading = false;
    },
    fetchStudentListFailed(state) {
      //Do nothing
      state.loading = false;
    },

    setFilter(state, action:PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action:PayloadAction<ListParams>) {      
    },

  },
});

//Actions
export const studentActions = studentSlice.actions;

//Selector
export const selectStudentList =  (state: RootState) => state.student.list;
export const selectStudentLoading =  (state: RootState) => state.student.loading;
export const selectStudentFilter =  (state: RootState) => state.student.filter;
export const selectStudentPagination =  (state: RootState) => state.student.pagination;

//Reducer
const studentReducer = studentSlice.reducer;
export default studentReducer;
