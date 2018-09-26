import { axios } from "./axios";
import { URLS } from "./urls";
export function updateProfile(user, userId) {
    const formData = new FormData();
    formData.append('userid', userId);
    formData.append('Name', user.Name);
    formData.append('Email', user.Email);
    formData.append('Position', user.Position);
    formData.append('DateHired', user.DateHired);
    formData.append('MobileNo', user.MobileNo);
    formData.append('LandlineNo', user.LandlineNo);
    formData.append('Bday', user.Bday);
    formData.append('Remark', user.Remark);

   return axios.post(URLS.UPDATE_PROFILE, formData,
        { headers: { 'Content-Type': 'multipart/form-data' } })
     
}