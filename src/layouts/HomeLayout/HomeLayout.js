import classNames from 'classnames/bind';

import styles from './HomeLayout.module.scss';
import Header from './components/Header';

const cx = classNames.bind(styles);

function HomeLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <h3>Sidebar</h3>
            <div>{children}</div>

            <p>Bottom Container</p>
        </div>
    );
}

export default HomeLayout;
