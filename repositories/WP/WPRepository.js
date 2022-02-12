/*
 * WPReact
 * Developed by: diaryforlife
 * */
import axios from 'axios';

export const WPDomain = 'https://paragraf.uz';

const username = 'ck_a84f9db0adf5f2cb773a4f935a193b7bf2c86d84';
const password = 'cs_d3021e56e149c76f1f6590443bfbb93be132bbb4';

export const oathInfo = {
    consumer_key: username,
    consumer_secret: password,
};

export const customHeaders = {
    Accept: '*/*',
};

export const WPRepository = axios.create({
    headers: customHeaders,
});

