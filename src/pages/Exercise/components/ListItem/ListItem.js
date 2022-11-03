import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

import styles from './ListItem.module.scss';

const cx = classNames.bind(styles);

const ListItem = ({ title, data, bottomline = 1, ...passProps }) => {
    return (
        <div {...passProps} className={cx('wrapper', { bottomline: bottomline })}>
            {title && <h4 className={cx('title')}>{title}</h4>}
            <div className={cx('list')}>
                {data?.map((item, index) => {
                    return (
                        <NavLink
                            to={`/exercise/t/1${item.topicId !== 0 ? `/${item.topicId}` : '/0'}`}
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
