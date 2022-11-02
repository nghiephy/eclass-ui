import axios from '~/api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/user/refresh', {
            withCredentials: true,
        });
        setAuth((prev) => {
            let roles = ['user'];
            return { ...response.data.dataUser, roles, accessToken: response.data.accessToken };
        });
        return response.data.accessToken;
    };
    return refresh;
};

export default useRefreshToken;
