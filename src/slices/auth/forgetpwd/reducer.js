import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  forgetSuccessMsg: null,
  forgetError: null,
};

const forgotPasswordSlice = createSlice({
  name: "forgotpwd",
  initialState,
  reducers: {
    userForgetPasswordSuccess(state, action) {
      state.forgetSuccessMsg = action.payload;
    },
    userForgetPasswordError(state, action) {
      state.forgetError = action.payload;
    },
  },
});

export const { userForgetPasswordSuccess, userForgetPasswordError } =
  forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";:
// Redux Toolkit에서 제공하는 createSlice 함수를 가져옵니다. 이 함수를 사용하여 Redux 슬라이스를 생성합니다.

// export const initialState = { ... };:
// 초기 상태 객체를 정의합니다. 이 객체는 Redux 슬라이스의 상태를 나타냅니다.
// forgetSuccessMsg와 forgetError라는 두 개의 속성을 포함하며, 초기값은 모두 null입니다.

// const forgotPasswordSlice = createSlice({ ... });:
// createSlice 함수를 사용하여 Redux 슬라이스를 생성합니다.
// 이 슬라이스는 이름이 "forgotpwd"이며,
//  위에서 정의한 initialState와 두 개의 리듀서(reducer) 함수를 가지고 있습니다.

// Redux 슬라이스의 이름은 스토어에서 상태를 관리하는 데 도움이 되는 개념적인 이름입니다.
// 슬라이스 이름은 주로 프로젝트 내에서 해당 슬라이스와 관련된 상태 및 액션을 식별하는 데 사용됩니다.
// 이름을 통해 스토어의 일부가 어떤 종류의 데이터를 나타내는지 쉽게 이해할 수 있습니다.

// userForgetPasswordSuccess: 이 리듀서는 state 객체에 forgetSuccessMsg 속성을 설정하여
// 사용자의 비밀번호 재설정에 성공한 경우 성공 메시지를 저장합니다.

// userForgetPasswordError: 이 리듀서는 state 객체에 forgetError 속성을 설정하여
// 사용자의 비밀번호 재설정 중에 오류가 발생한 경우 오류 메시지를 저장합니다.

// export const { ... } = forgotPasswordSlice.actions: forgotPasswordSlice 슬라이스에서 리듀서 액션들을 내보냅니다.
// 이러한 액션들은 Redux 액션 생성자(action creator) 함수를 나타냅니다.
// 위의 코드에서는 userForgetPasswordSuccess와 userForgetPasswordError 액션 생성자 함수가 내보내집니다.

// export default forgotPasswordSlice.reducer;: forgotPasswordSlice 슬라이스의 리듀서를 내보냅니다.
// 이 리듀서는 Redux 스토어에서 상태를 업데이트하는 데 사용됩니다.

// 이러한 Redux 슬라이스를 사용하면 Redux 스토어에서 비밀번호 재설정과 관련된 상태를 효과적으로 관리할 수 있습니다.
// userForgetPasswordSuccess 및 userForgetPasswordError 액션을 디스패치(dispatch)하여 상태를 업데이트할 수 있고,
//  컴포넌트에서 이러한 상태를 사용하여 UI를 업데이트할 수 있습니다.
