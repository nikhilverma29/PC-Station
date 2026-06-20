import { createContext, useReducer, useEffect } from 'react';
import { STEP_ORDER } from '@/data/products';
import { checkCompatibility } from '@/data/compatibility';

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
      const newBuild = {
        id: `build-${Date.now()}`,
        name,
        date: new Date().toISOString(),
        selections: { ...state.selections },
        totalPrice: calculateTotal(state.selections),
      };
      const updatedBuilds = [newBuild, ...state.savedBuilds].slice(0, 10);
      persistBuilds(updatedBuilds);
      return { ...state, savedBuilds: updatedBuilds };
    }

    case 'DELETE_BUILD': {
      const { buildId } = action.payload;
      const updatedBuilds = state.savedBuilds.filter((b) => b.id !== buildId);
      const updatedCompare = state.compareList.filter((id) => id !== buildId);
      persistBuilds(updatedBuilds);
      return { ...state, savedBuilds: updatedBuilds, compareList: updatedCompare };
    }

    case 'LOAD_BUILD': {
      const { buildId } = action.payload;
      const build = state.savedBuilds.find((b) => b.id === buildId);
      if (!build) return state;
      return {
        ...state,
        selections: { ...build.selections },
        currentStep: STEP_ORDER.length, // Go to review
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
      };

    case 'SET_CURRENCY':
      return {
        ...state,
        currency: action.payload,
      };

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

  // Sync saved builds to localStorage whenever they change
  useEffect(() => {
    persistBuilds(state.savedBuilds);
  }, [state.savedBuilds]);

  const totalPrice = calculateTotal(state.selections);
  const compatibilityIssues = checkCompatibility(state.selections);
  const completedSteps = STEP_ORDER.filter(
    (step) => state.selections[step] !== null
  );

  const value = {
    ...state,
    totalPrice,
    compatibilityIssues,
    completedSteps,
    dispatch,
  };

  return (
    <ConfiguratorContext.Provider value={value}>
      {children}
    </ConfiguratorContext.Provider>
  );
}
