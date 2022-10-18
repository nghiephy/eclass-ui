import axios from '~/api/axios';
import useAuth from './useAuth';

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            await axios.post(
                '/user/logout',
                {},
                {
                    withCredentials: true,
                    credentials: 'include',
                },
            );
        } catch (err) {
            console.error(err);
        }
    };

    return logout;
};

export default useLogout;
