import httpRequest from '~/utils/httpRequest';
import config from '~/config';

const login = async (data) => {
    const res = await httpRequest.post(config.api.auth.LOGIN, data);
    return res.data;
};

export { login };
