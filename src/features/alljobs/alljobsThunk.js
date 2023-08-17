import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';

export const getAllJobsThunk = async (_, thunkApi) => {
  const { page, search, searchStatus, searchType, sort } =
    thunkApi.getState().allJobs;
  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
  if (search) {
    url = url + `&search=${search}`;
  }
  try {
    const res = await customFetch.get(url);
    return res.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkApi);
  }
};

export const showStatsThunk = async (_, thunkApi) => {
  try {
    const res = await customFetch.get('/jobs/stats');
    return res.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkApi);
  }
};
