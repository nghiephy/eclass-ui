import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

import styles from './ListItem.module.scss';
import useAuth from '~/hooks/useAuth';

const cx = classNames.bind(styles);

const ListItem = ({ title, data, bottomline = 1, type, ...passProps }) => {
    const { classData } = useAuth();
    return (
        <div {...passProps} className={cx('wrapper', { bottomline: bottomline })}>
            {title && <h4 className={cx('title')}>{title}</h4>}
            <div className={cx('list')}>
                {data?.map((item, index) => {
                    return (
                        <NavLink
                            to={`/todo-exercise/${type}${item.code !== 0 ? `/${item.code}` : '/all'}`}
                            key={index}
                            className={(nav) => cx('item', { active: nav.isActive })}
                        >
                            <div className={cx('item-content')}>
                                <p className={cx('name')}>{item.name}</p>
                            </div>
                        </NavLink>
                    );
                })}
            </div>
        </div>
    );
};

export default ListItem;
