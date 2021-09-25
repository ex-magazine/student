import { call, takeLatest, put } from "@redux-saga/core/effects";
import cityApi from "api/cityApi";
import { ListResponse, City } from "models";
import { cityActions } from "./citySlice";


function* fetchCityList() {
  try {
    const response: ListResponse<City> = yield call(cityApi.getAll);
    yield put(cityActions.fetchCityListSuccess(response));
  } catch (error) {
    console.log('False', error);
    yield put(cityActions.fetchCityListFailed());
  }
}

export default function* citySaga() {
  yield takeLatest(cityActions.fetchCityList.type, fetchCityList);
}