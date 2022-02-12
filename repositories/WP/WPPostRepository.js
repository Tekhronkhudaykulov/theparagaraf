/*
 * WPReact
 * Developed by: diaryforlife
 * */
import { WPDomain, WPRepository } from '~/repositories/WP/WPRepository';
import { serializeQuery } from '~/repositories/Repository';

class WPPostRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async getCategories() {
        const endPoint = 'wp-json/wp/v3/categories';
        const response = await WPRepository.get(`${WPDomain}/${endPoint}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return response;
    }

    async getPosts(payload) {
        let endPoint;
        console.log(payload);
        if (payload) {
            endPoint = `wp-json/wp/v3/posts?${serializeQuery({
                ...payload,
            })}&_embed`;
        } else {
            endPoint = 'wp-json/wp/v3/posts?_embed';
        }

        return await WPRepository.get(`${WPDomain}/${endPoint}`)
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
    }

    async getPostByID(postID) {
        const endPoint = `wp-json/wp/v3/posts/${postID}?_embed`;
        const response = await WPRepository.get(`${WPDomain}/${endPoint}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return response;
    }
}

export default new WPPostRepository();
