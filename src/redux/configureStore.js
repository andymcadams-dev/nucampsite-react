import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-thunk';
import { createForms } from 'react-redux-form';
import { Campsites } from './campsites';
import { Comments } from './comments';
import { Partners } from './partners';
import { Promotions } from './promotions';
import { InitialFeedback } from './forms';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
          campsites: Campsites,
          comments: Comments,
          partners: Partners,
          promotions: Promotions,
            createForms({
            feedbackForm: InitialFeedback
          })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};