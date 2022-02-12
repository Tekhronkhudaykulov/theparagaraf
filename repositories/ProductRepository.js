import Repository, { baseUrl, serializeQuery } from './Repository';

class ProductRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async getRecords(params) {
        const response = await Repository.get(
            `${baseUrl}/products?${serializeQuery(params)}`
        )
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;
    }

    async getBrands() {
        const response = await Repository.get(`${baseUrl}/brands`)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;
    }

    async getProductCategories() {
        const response = await Repository.get(`${baseUrl}/product-categories`)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;
    }

    async getTotalRecords() {
        const response = await Repository.get(`${baseUrl}/products/count`)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;
    }

    async getProductsById(payload) {
        const response = await Repository.get(`${baseUrl}/products/${payload}`)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;
    }

    async getProductsByCategory(payload) {
        const response = await Repository.get(
            `${baseUrl}/product-categories?slug=${payload}`
        )
            .then(response => {
                return response.data[0].products;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;
    }

    async getProductsByBrands(payload) {
        let query = '';
        payload.forEach(item => {
            if (query === '') {
                query = `id_in=${item}`;
            } else {
                query = query + `&id_in=${item}`;
            }
        });
        const response = await Repository.get(`${baseUrl}/brands?${query}`)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;
    }

    async getProductsByPriceRange(payload) {
        const response = await Repository.get(
            `${baseUrl}/products?${serializeQuery(payload)}`
        )
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;
    }

    async getProductWP(payload) {
        const endpoint = 'wp-json';
        const response = await Repository.get(`${baseUrl}/${endpoint}`)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;
    }
}

export default new ProductRepository();
