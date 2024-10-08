const asyncThunkWrapper = asyncFunction => async (args, thunkAPI) => {
  try {
    const res = await asyncFunction(args, thunkAPI);

    if (thunkAPI.extra?.toast) {
      thunkAPI.extra.toast.dismiss();
      thunkAPI.extra.toast.success(
        thunkAPI.extra.i18n.t('description.toast.SuccessMessage')
      );
    }
    return res;
  } catch (error) {
    const serializableError = {
      message: error.message,
      name: error.name,
      code: error.code,
      response: error.response
        ? {
            status: error.response.status,
            data: error.response.data,
          }
        : undefined,
    };

    if (error.response?.status === 409) {
      if (thunkAPI.extra?.toast) {
        thunkAPI.extra.toast.dismiss();
        thunkAPI.extra.toast.error(
          `${thunkAPI.extra.i18n.t('description.toast.PrecodeExists')}`
        );
      }
    } else {
      if (thunkAPI.extra?.toast) {
        thunkAPI.extra.toast.dismiss();
        thunkAPI.extra.toast.error(
          thunkAPI.extra.i18n.t('description.toast.ErrorMessage')
        );
      }
    }

    return thunkAPI.rejectWithValue(serializableError);
  }
};

export default asyncThunkWrapper;
