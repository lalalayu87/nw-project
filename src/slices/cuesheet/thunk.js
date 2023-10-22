import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const SLICE_NAME = "cuesheet";

// getCuesheets Redux Toolkit의 createAsyncThunk 함수를 사용하여 생성된 비동기 액션 생성자
// 이 함수는 비동기적인 작업을 수행하고 해당 작업이 완료되면 Redux 스토어의 상태를 업데이트하는 데 사용
export const getCuesheets = createAsyncThunk(
  SLICE_NAME + "/getCuesheets",
  async () => {
    try {
      const response = await axios.get(
        "http://152.69.228.245:10001/api/v1/qsheet"
      ); // 실제 엔드포인트로 변경
      // 요청이 성공하면 데이터를 반환
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
