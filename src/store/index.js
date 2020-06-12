import logger from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import root_reducer from "./reducer";

const store = createStore(root_reducer, applyMiddleware(logger, ReduxThunk));

export default store;
