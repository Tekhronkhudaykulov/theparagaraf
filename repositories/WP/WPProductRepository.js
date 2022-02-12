/*
 * WPReact
 * Developed by: diaryforlife
 * */
import {
    oathInfo,
    WPDomain,
    WPRepository,
} from '~/repositories/WP/WPRepository';
import { serializeQuery } from '~/repositories/Repository';

class WPProductRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async getProducts(payload) {
        let endpoint;
        if (payload) {
            endpoint = `wp-json/wc/v3/products?${serializeQuery({
                ...payload,
                ...oathInfo,
            })}`;
        } else {
            endpoint = 'wp-json/wc/v3/products';
        }
        const response = await WPRepository.get(`${WPDomain}/${endpoint}`)
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    const data = {
                        items: response.data,
                        totalItems: response.headers['x-wp-total'],
                        totalPages: response.headers['x-wp-totalpages'],
                    };
                    return data;
                } else return null;
            })
            .catch(() => {
                return null;
            });
        return response;
    }

    async getProductAttributes() {
        const endpoint = `/wp-json/wc/v3/products/attributes?${serializeQuery({
            ...oathInfo,
        })}`;
        const response = await WPRepository.get(`${WPDomain}/${endpoint}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return response;
    }

    async getBrands() {
        const endpoint = `wp-json/wc/v3/products/attributes/10/terms?${serializeQuery(
            {
                ...oathInfo,
            }
        )}`;
        return await WPRepository.get(`${WPDomain}/${endpoint}`)
            .then((response) => {
                return response.data;
            })
            .catch(() => {
                return null;
            });
    }

    async getProductCategories(payload) {
        let endpoint;
        if (payload) {
            endpoint = `wp-json/wc/v3/products/categories?${serializeQuery({
                ...payload,
                ...oathInfo,
            })}`;
        } else {
            endpoint = 'wp-json/wc/v3/products/categories';
        }
        const response = await WPRepository.get(`${WPDomain}/${endpoint}`)
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    const data = {
                        items: response.data,
                        totalItems: response.headers['x-wp-total'],
                        totalPages: response.headers['x-wp-totalpages'],
                    };
                    return data;
                } else return null;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return response;
    }

    async getProductByID(payload) {
        const endpoint = `wp-json/wc/v3/products/${payload}?${serializeQuery({
            ...oathInfo,
        })}`;
        const response = await WPRepository.get(`${WPDomain}/${endpoint}`)
            .then((response) => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error.message));
                return null;
            });
        return response;
    }

    async getProductVariantsByID(payload) {
        const endpoint = `wp-json/wc/v3/products/${payload}/variations?${serializeQuery(
            {
                ...oathInfo,
            }
        )}`;
        const response = await WPRepository.get(`${WPDomain}/${endpoint}`)
            .then((response) => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error.message));
                return null;
            });
        return response;
    }

    async getRelatedProductByID(payload) {
        const endpoint = `wp-json/wc/v2/products/?include=${payload}?${serializeQuery(
            {
                ...oathInfo,
            }
        )}`;
        const response = await WPRepository.get(`${WPDomain}/${endpoint}`)
            .then((response) => {
                console.log(response);
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return response;
    }

    async getCategoryByID(payload) {
        const endpoint = `wp-json/wc/v3/products/categories/${payload}?${serializeQuery(
            {
                ...oathInfo,
            }
        )}`;
        const response = await WPRepository.get(`${WPDomain}/${endpoint}`)
            .then((response) => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error.message));
                return null;
            });
        return response;
    }
}

export default new WPProductRepository();
