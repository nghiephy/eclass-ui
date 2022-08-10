import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';

import styles from './TabList.module.scss';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function TabList({ data, ...passProps }) {
    return (
        <div {...passProps} className={cx('wrapper')}>
            <div className={cx('list')}>
                {data.map((item, index) => {
                    return (
                        <NavLink to={item.path} key={index} className={(nav) => cx('item', { active: nav.isActive })}>
                            <span className={cx('item-title')}>{item.title}</span>
                        </NavLink>
                    );
                })}
                <div className={cx('tab-line')}></div>
            </div>
        </div>
    );
}

export default TabList;
