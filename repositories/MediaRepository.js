import Repository, { baseUrl } from './Repository';
import { convertSlugsQueryString } from '../utilities/product-helper';

class MediaRespository {
    constructor(callback) {
        this.callback = callback;
    }

    async getBannersBySlugs(payload) {
        let query = '';
        payload.forEach(item => {
            if (query === '') {
                query = `slug_in=${item}`;
            } else {
                query = query + `&slug_in=${item}`;
            }
        });
        const response = await Repository.get(`${baseUrl}/banners?${query}`)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return response;
    }

    async getPromotionsBySlugs(payload) {
        const query = convertSlugsQueryString(payload);
        const response = await Repository.get(`${baseUrl}/promotions?${query}`)
            .then(response => {
                return response.data;
            })
            .catch(error => ({
                error: JSON.stringify(error),
            }));
        return response;
    }
}

export default new MediaRespository();
