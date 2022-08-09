import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

import styles from './ListItem.module.scss';

const cx = classNames.bind(styles);

const Sidebar = ({ title, data, bottomline = 1, ...passProps }) => {
    return (
        <div {...passProps} className={cx('wrapper', { bottomline: bottomline })}>
            {title && <h4 className={cx('title')}>{title}</h4>}
            <div className={cx('list')}>
                {data.map((item, index) => {
                    return (
                        <NavLink to={item.path} key={index} className={(nav) => cx('item', { active: nav.isActive })}>
                            <div className={cx('item-imgbox')}>
                                <img src={item.image} alt="logo class" />
                            </div>
                            {item.name}
                        </NavLink>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;
