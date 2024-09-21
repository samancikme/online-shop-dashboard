export const initialState = {
  categories: [],
  products: [],
  isCatLoading: false,
  isProLoading: false,
  catErr: null,
  proErr: null,
  path: "/",
  modalType: "",
  showModal: false,
  selectItemId : null,
  isLoading: false,
  menuAct : false,
  colorMode : false  //false === dark ; true === light
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCHING_CAT_DATA":
      return {
        ...state,
        isCatLoading: true,
      };
    case "FETCHED_CAT_DATA":
      return {
        ...state,
        isCatLoading: false,
        categories: action.payload,
      };
    case "FETCHED_CAT_DATA_ERR":
      return {
        ...state,
        isCatLoading: false,
        catErr: action.payload,
      };
    case "FETCHING_PRO_DATA":
      return {
        ...state,
        isProLoading: true,
      };
    case "FETCHED_PRO_DATA":
      return {
        ...state,
        isProLoading: false,
        products: action.payload,
      };
    case "FETCHED_PRO_DATA_ERR":
      return {
        ...state,
        isProLoading: false,
        proErr: action.payload,
      };
    case "SET_PATH":
      return {
        ...state,
        path: action.payload,
      };
    case "SELECT_ITEM_ID":
      return {
        ...state,
        selectItemId: action.payload,
      };
    case "TOGGLE_MODAL_ALERT":
      return {
        ...state,
        showModal: !state.showModal,
      };
    case "SELECT_MODAL_TYPE":
      return {
        ...state,
        modalType: action.payload,
      };
    case "SET_CREATE_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_MENU_ACT":
      return {
        ...state,
        menuAct: !state.menuAct,
      };
    case "SET_COLOR_MODE":
      return {
        ...state,
        colorMode: !state.colorMode,
      };
    default:
      return state;
  }
};
// 