import classNames from 'classnames/bind';

import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx('wrapper')}>
            <h1>This is login page!</h1>
        </div>
    );
}

export default Login;
