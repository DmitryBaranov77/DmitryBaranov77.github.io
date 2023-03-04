import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reducer } from "./reducers";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

const persistConfig = {
	key: 'root',
	storage: storage,
	blacklist: ['modalStore', 'cart'],
	stateReconciler: autoMergeLevel2,
};

const pReducer = persistReducer(persistConfig, reducer);
export const store = createStore(pReducer);
export const persistor = persistStore(store);