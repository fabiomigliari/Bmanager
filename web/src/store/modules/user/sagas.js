import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '../../../services/api';

import { showSnackbar } from '../../../store/modules/ui/actions';
import {
  updateAvatarSuccess,
  updateAvatarFailure,
  deleteAvatarSuccess,
  deleteAvatarFailure,
} from './actions';

export function* updateAvatar({ payload }) {
  try {
    const { data } = payload;

    const response = yield call(api.post, 'profile/avatar', data);

    yield put(showSnackbar('success', 'Imagem de perfil salva com sucesso.'));
    yield put(updateAvatarSuccess(response.data));
  } catch (error) {
    yield put(
      showSnackbar(
        'error',
        'Não foi possível salvar a imagem de perfil, tente novamente.'
      )
    );
    yield put(updateAvatarFailure());
  }
}

export function* deleteAvatar() {
  try {
    yield call(api.delete, 'profile/avatar');

    yield put(
      showSnackbar('success', 'Imagem de perfil removida com sucesso.')
    );
    yield put(deleteAvatarSuccess());
  } catch (error) {
    yield put(
      showSnackbar(
        'error',
        'Não foi possível remover a imagem de perfil, tente novamente.'
      )
    );
    yield put(deleteAvatarFailure());
  }
}

export default all([
  takeLatest('@user/UPDATE_AVATAR_REQUEST', updateAvatar),
  takeLatest('@user/DELETE_AVATAR_REQUEST', deleteAvatar),
]);
