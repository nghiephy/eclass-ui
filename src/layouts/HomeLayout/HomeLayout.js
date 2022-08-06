import classNames from 'classnames/bind';

import styles from './HomeLayout.module.scss';
import Header from './components/Header';
import Sidebar from '~/components/Sidebar';
import { useState } from 'react';

const cx = classNames.bind(styles);

function HomeLayout({ children }) {
    const [showSidebar, setShowSideBar] = useState(false);

    const toggleSidebar = () => {
        setShowSideBar(!showSidebar);
    };
    return (
        <div className={cx('wrapper')}>
            <Header toggleSidebar={toggleSidebar} />

            <Sidebar show={showSidebar} />

            <div>{children}</div>

            <div className={`overlay ${showSidebar && 'show'}`} onClick={toggleSidebar}></div>
        </div>
    );
}

export default HomeLayout;
