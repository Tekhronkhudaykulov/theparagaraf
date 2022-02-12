import axios from 'axios';
const baseDomain = 'https://paragraf.uz/wp-json/wc/v3';
// export const wp = 'https://wp.nouhtml5.com';
//export const wp = 'http://wp.diaryforlife.info';

const authorization_prefix = 'Basic Auth';

export const customHeaders = {
    "Accept": 'application/json',
    Authorization: authorization_prefix,
    auth: {
        "username": "ck_a84f9db0adf5f2cb773a4f935a193b7bf2c86d84",
        "password": "cs_d3021e56e149c76f1f6590443bfbb93be132bbb4"
    }
};

export const baseUrl = `${baseDomain}`;

export default axios.create({
    baseUrl,
    headers: customHeaders,
});

export const serializeQuery = query => {
    return Object.keys(query)
        .map(
            key =>
                `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&');
};
