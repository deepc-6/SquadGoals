import { playerConstants } from '../_constants';

export function players(state = {}, action) {
  switch (action.type) {
    case playerConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case playerConstants.GETALL_SUCCESS:
      return {
        players: action.players,
      };
    case playerConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case playerConstants.CREATEONE_REQUEST:
      return {
        loading: true,
      };
    case playerConstants.CREATEONE_SUCCESS:
      return {};
    case playerConstants.CREATEONE_FAILURE:
      return {
        error: action.error,
      };
    case playerConstants.UPDATE_REQUEST:
      return {
        loading: true,
      };
    case playerConstants.UPDATE_SUCCESS:
      return {
        player: action.player,
      };
    case playerConstants.UPDATE_FAILURE:
      return {
        error: action.error,
      };
    case playerConstants.DELETE_REQUEST:
      return {
        loading: true,
      };
    case playerConstants.DELETE_SUCCESS:
      return {};
    case playerConstants.DELETE_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
