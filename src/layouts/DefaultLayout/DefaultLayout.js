import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './DefaultLayout.module.scss';
import Header from './components/Header';
import Sidebar from '~/components/Sidebar';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [showSidebar, setShowSideBar] = useState(false);

    const toggleSidebar = () => {
        setShowSideBar(!showSidebar);
    };
    return (
        <div className={cx('wrapper')}>
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar show={showSidebar} />

            <div className={cx('body')}>{children}</div>

            <div className={`overlay ${showSidebar && 'show'}`} onClick={toggleSidebar}></div>
        </div>
    );
}

export default DefaultLayout;
