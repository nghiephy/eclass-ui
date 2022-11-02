import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import styles from './ListItem.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const Sidebar = ({ title, data, dataActions, bottomline = 1, ...passProps }) => {
    const navigate = useNavigate();

    return (
        <div {...passProps} className={cx('wrapper', { bottomline: bottomline })}>
            {title && <h4 className={cx('title')}>{title}</h4>}
            <div className={cx('list')}>
                {dataActions?.map((item, index) => {
                    return (
                        <NavLink to={item.path} key={index} className={(nav) => cx('item', { active: nav.isActive })}>
                            <div className={cx('item-imgbox')}>
                                <img src={item.image} alt="logo class" />
                            </div>
                            <div className={cx('item-content')}>
                                <p className={cx('name')}>{item.name}</p>
                                <p className={cx('semester')}>{item.semester}</p>
                            </div>
                        </NavLink>
                    );
                })}
                {data?.map((item, index) => {
                    return (
                        <NavLink
                            to={`/stream/${item.classId}`}
                            key={index}
                            className={(nav) => cx('item', { active: nav.isActive })}
                        >
                            <div className={cx('item-imgbox')}>
                                <img
                                    src={
                                        item.image
                                            ? `http://localhost:3002/img/${item.image}`
                                            : images.default_icon_class
                                    }
                                    alt="logo class"
                                />
                            </div>
                            <div className={cx('item-content')}>
                                <p className={cx('name')}>{item.className}</p>
                                <p className={cx('semester')}>{item.semester}</p>
                            </div>
                        </NavLink>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;
