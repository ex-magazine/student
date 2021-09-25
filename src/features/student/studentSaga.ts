import { takeLatest,call, put, debounce } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { ListParams, ListResponse, Students } from "models";
import { studentActions } from "./studentSlice";
import studentApi from "api/studentsApi";


function* fetchStudentList(action: PayloadAction<ListParams>){
  try {
    const response: ListResponse<Students> =  yield call(studentApi.getAll, action.payload);
    yield put(studentActions.fetchStudentListSuccess(response));
  } catch (error) { 
    console.log('Failed to fetch student list', error);
    yield put(studentActions.fetchStudentListFailed());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>){
  console.log('Student Saga Debounce', action.payload);
  yield put(studentActions.setFilter(action.payload));
}

export default function* studentSaga() {
  //watch student fetch action
  yield takeLatest(studentActions.fetchStudentList, fetchStudentList);

  yield debounce(500, studentActions.setFilterWithDebounce.type, handleSearchDebounce);
}