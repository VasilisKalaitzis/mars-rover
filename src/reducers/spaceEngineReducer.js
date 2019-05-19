import {
  MODIFY_ENGINE_PROP,
  FETCH_ENGINE_DATA,
  UPDATE_PLATEAU_STATE
} from "../actions/types";

const initialState = {
  output: "",
  rovers: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ENGINE_DATA:
      // set layout's property
      return state;
    case UPDATE_PLATEAU_STATE:
      // this could take place on the MODIFY_ENGINE_PROP, however I am trying to minimize
      // the code snipsets that the reviewers will have to care about
      return {
        ...state,
        output: action.payload.output,
        rovers: action.payload.rovers
      };
    case MODIFY_ENGINE_PROP:
      // set layout's property
      return {
        ...state,
        [action.payload.property]: action.payload.value
      };
    default:
      return state;
  }
}
