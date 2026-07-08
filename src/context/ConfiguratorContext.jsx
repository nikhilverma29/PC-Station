import { createContext, useReducer, useEffect, useState } from 'react';
import { STEP_ORDER, productsByCategory } from '@/data/products';
import { checkCompatibility } from '@/data/compatibility';
import { productsAPI, buildsAPI } from '@/services/api';

const STORAGE_KEY = 'pcforge-saved-builds';

function loadSavedBuilds() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function persistBuilds(builds) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(builds));
  } catch {
    // Silently fail if localStorage is full
  }
}

const initialSelections = {
  cpu: null,
  gpu: null,
  motherboard: null,
  ram: null,
  storage: null,
  pccase: null,
  psu: null,
};

const initialState = {
  currentStep: 0,
  selections: { ...initialSelections },
  savedBuilds: loadSavedBuilds(),
  compareList: [],
  currency: 'INR',
  editingBuildId: null,
};

function configuratorReducer(state, action) {
  switch (action.type) {
    case 'SELECT_COMPONENT': {
      const { category, product } = action.payload;
      const newSelections = { ...state.selections, [category]: product };
      return { ...state, selections: newSelections };
    }

    case 'CLEAR_COMPONENT': {
      const { category } = action.payload;
      const newSelections = { ...state.selections, [category]: null };
      return { ...state, selections: newSelections };
    }

    case 'SET_STEP':
      return { ...state, currentStep: action.payload };

    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, STEP_ORDER.length),
      };

    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0),
      };

    case 'SAVE_BUILD': {
      const { name } = action.payload;

      if (state.editingBuildId) {
        const updatedBuilds = state.savedBuilds.map((b) =>
          b.id === state.editingBuildId
            ? {
                ...b,
                name,
                date: new Date().toISOString(),
                selections: { ...state.selections },
                totalPrice: calculateTotal(state.selections),
              }
            : b
        );
        persistBuilds(updatedBuilds);
        return { ...state, savedBuilds: updatedBuilds };
      }

      const newBuild = {
        id: `build-${Date.now()}`,
        name,
        date: new Date().toISOString(),
        selections: { ...state.selections },
        totalPrice: calculateTotal(state.selections),
      };
      const updatedBuilds = [newBuild, ...state.savedBuilds].slice(0, 10);
      persistBuilds(updatedBuilds);
      return { ...state, savedBuilds: updatedBuilds, editingBuildId: newBuild.id };
    }

    case 'DELETE_BUILD': {
      const { buildId } = action.payload;
      const updatedBuilds = state.savedBuilds.filter((b) => b.id !== buildId);
      const updatedCompare = state.compareList.filter((id) => id !== buildId);
      persistBuilds(updatedBuilds);
      
      const newEditingBuildId = state.editingBuildId === buildId ? null : state.editingBuildId;

      return { ...state, savedBuilds: updatedBuilds, compareList: updatedCompare, editingBuildId: newEditingBuildId };
    }

    case 'LOAD_BUILD': {
      const { buildId } = action.payload;
      const build = state.savedBuilds.find((b) => b.id === buildId);
      if (!build) return state;
      return {
        ...state,
        selections: { ...build.selections },
        currentStep: STEP_ORDER.length, // Go to review
        editingBuildId: null,
      };
    }

    case 'LOAD_BUILD_FOR_EDIT': {
      const { buildId } = action.payload;
      const build = state.savedBuilds.find((b) => b.id === buildId);
      if (!build) return state;
      return {
        ...state,
        selections: { ...build.selections },
        currentStep: STEP_ORDER.length, // Go to review
        editingBuildId: buildId,
      };
    }

    case 'TOGGLE_COMPARE': {
      const { buildId } = action.payload;
      const isInList = state.compareList.includes(buildId);
      let newList;
      if (isInList) {
        newList = state.compareList.filter((id) => id !== buildId);
      } else {
        newList = state.compareList.length >= 2
          ? [state.compareList[1], buildId]
          : [...state.compareList, buildId];
      }
      return { ...state, compareList: newList };
    }

    case 'RESET_BUILD':
      return {
        ...state,
        currentStep: 0,
        selections: { ...initialSelections },
        editingBuildId: null,
      };

    case 'SET_CURRENCY':
      return {
        ...state,
        currency: action.payload,
      };

    case 'SET_SAVED_BUILDS':
      return { ...state, savedBuilds: action.payload };

    default:
      return state;
  }
}

function calculateTotal(selections) {
  return Object.values(selections).reduce(
    (sum, item) => sum + (item?.price || 0),
    0
  );
}

export const ConfiguratorContext = createContext(null);

export function ConfiguratorProvider({ children }) {
  const [state, dispatch] = useReducer(configuratorReducer, initialState);

  // ── Products: fetched from API, falls back to static data instantly ──
  const [products, setProducts] = useState(productsByCategory);

  useEffect(() => {
    productsAPI.getAll()
      .then((data) => {
        const grouped = {};
        for (const p of data.products) {
          if (!grouped[p.category]) grouped[p.category] = [];
          grouped[p.category].push(p);
        }
        setProducts(grouped);
      })
      .catch(() => { /* API down — static data already in use */ });
  }, []);

  // ── Cloud builds: load from backend if user is logged in ──
  useEffect(() => {
    const token = localStorage.getItem('pc-station-token');
    if (!token) return;
    buildsAPI.getAll()
      .then((data) => {
        if (data.builds?.length) {
          dispatch({
            type: 'SET_SAVED_BUILDS',
            payload: data.builds.map((b) => ({
              id: b._id,
              name: b.name,
              date: b.updatedAt,
              selections: b.selections,
              totalPrice: b.totalPrice,
              _cloudId: b._id,
            })),
          });
        }
      })
      .catch(() => { /* local builds remain */ });
  }, []);

  // Sync saved builds to localStorage whenever they change
  useEffect(() => {
    persistBuilds(state.savedBuilds);
  }, [state.savedBuilds]);

  const totalPrice = calculateTotal(state.selections);
  const compatibilityIssues = checkCompatibility(state.selections);
  const completedSteps = STEP_ORDER.filter(
    (step) => state.selections[step] !== null
  );

  // ── Cloud-aware dispatch: syncs SAVE/DELETE to backend when logged in ──
  const cloudDispatch = async (action) => {
    const token = localStorage.getItem('pc-station-token');

    if (action.type === 'SAVE_BUILD' && token) {
      dispatch(action);
      try {
        await buildsAPI.create(action.payload.name, state.selections, calculateTotal(state.selections));
        const data = await buildsAPI.getAll();
        dispatch({
          type: 'SET_SAVED_BUILDS',
          payload: data.builds.map((b) => ({
            id: b._id, name: b.name, date: b.updatedAt,
            selections: b.selections, totalPrice: b.totalPrice, _cloudId: b._id,
          })),
        });
      } catch { /* local save already done */ }
      return;
    }

    if (action.type === 'DELETE_BUILD' && token) {
      const target = state.savedBuilds.find((b) => b.id === action.payload.buildId);
      dispatch(action);
      if (target) {
        try { await buildsAPI.delete(target._cloudId || target.id); } catch { /* ok */ }
      }
      return;
    }

    dispatch(action);
  };

  const value = {
    ...state,
    totalPrice,
    compatibilityIssues,
    completedSteps,
    dispatch: cloudDispatch,
    products,
  };

  return (
    <ConfiguratorContext.Provider value={value}>
      {children}
    </ConfiguratorContext.Provider>
  );
}
