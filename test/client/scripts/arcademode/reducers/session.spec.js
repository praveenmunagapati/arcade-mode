//
// 'use strict';
//
// // import Immutable from 'immutable';
//
// // import Interpreter from 'js-interpreter';
//
// import {
//   FINISH_SESSION
// } from '../actions/session';
//
// import { CHALLENGE_START, CHALLENGE_NEXT } from '../actions/challenge';
//
// import UserData from '../model/UserData';
//
// // const initialState = Immutable.Map();
//
// /* TODO: Returns score for completed challenge. */
// const getScoreForChallenge = challenge => {
//   return 1;
// };
//
// export default function session (state, action) {
//   if (typeof state === 'undefined') {
//     return {
//       // Challenges.challenges[0].challengeSeed.join('\n'),
//       userOutput: 'The output of your code will show up here.',
//       userData: new UserData({ username: '' }),
//
//       // Session control variables
//       isSessionFinished: false,
//       isSessionStarted: false,
//       sessionScore: 0
//     };
//   }
//
//   const nextState = Object.assign({}, state);
//
//   switch (action.type) {
//     case CHALLENGE_START:
//       nextState.isSessionFinished = false;
//       nextState.isSessionStarted = true;
//       break;
//     case CHALLENGE_NEXT:
//       nextState.sessionScore = state.sessionScore + getScoreForChallenge(state.currChallenge);
//       nextState.userOutput = 'The output of your code will show up here.';
//       break;
//     case FINISH_SESSION:
//       nextState.isSessionFinished = true;
//       nextState.isSessionStarted = false;
//       break;
//     default:
//       // console.log('ERROR. ArcadeReducer default reached.');
//       return state;
//   }
//
//   return nextState;
// }

/* Unit tests for file client/scripts/arcademode/reducers/session.js. */
import chai, { expect, assert } from 'chai';
import Immutable from 'immutable';

import chaiImmutable from 'chai-immutable';

import reducer from '../../../../..//client/scripts/arcademode/reducers/session';
import { startChallenge, nextChallenge } from '../../../../../client/scripts/arcademode/actions/challenge';
import { actionFinishSession } from '../../../../../client/scripts/arcademode/actions/session';

chai.use(chaiImmutable);

const dummyAction = { type: 'DUMMY' };

describe('session reducer', () => {
  it('should indicate that no session has been started or finished', () => {
    const initialState = reducer(undefined, dummyAction);
    assert(initialState.isSessionStarted === false);
    assert(initialState.isSessionFinished === false);
  });

  it('should start the session with an action', () => {
    const initialState = reducer(undefined, dummyAction);
    const nextState = reducer(initialState, startChallenge(0));
    assert(initialState.isSessionStarted === false);
    assert(nextState.isSessionStarted === true);
  });

  it('should start session on CHALLENGE_START', () => {
    const state = Immutable.Map({
      isSessionFinished: false,
      isSessionStarted: false
    });
    const nextState = reducer(state, startChallenge(0)); // startTime = 0;
    expect(nextState).to.equal(Immutable.Map({
      isSessionFinished: false,
      isSessionStarted: true
    }));
  });

  it('should increment session score by 1 on CHALLENGE_NEXT', () => {
    const state = Immutable.Map({
      sessionScore: 0,
      userOutput: 'The output of your code will show up here.'
    });
    const nextState = reducer(state, nextChallenge(0)); // startTime = 0;
    expect(nextState).to.equal(Immutable.Map({
      sessionScore: 1,
      userOutput: 'The output of your code will show up here.'
    }));
  });

  it('should end session on SESSION_FINISH', () => {
    const state = Immutable.Map({
      isSessionFinished: false,
      isSessionStarted: true
    });
    const nextState = reducer(state, actionFinishSession());
    expect(nextState).to.equal(Immutable.Map({
      isSessionFinished: true,
      isSessionStarted: false
    }));
  });
});

