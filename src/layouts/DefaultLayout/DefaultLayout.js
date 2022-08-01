import classNames from 'classnames/bind';

import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <h1>Header</h1>
            <h3>Sidebar</h3>
            <div>{children}</div>

            <p>Bottom Container</p>
        </div>
    );
}

export default DefaultLayout;
