import axios from 'axios';
const { SHEET_API } = window['runConfig'];
export default axios.create({
  baseURL: SHEET_API
});