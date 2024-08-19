import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers/root-reducer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, any>;

