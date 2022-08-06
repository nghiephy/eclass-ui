import classNames from 'classnames/bind';
import Button from '~/components/Button';

import styles from './ListItem.module.scss';

const cx = classNames.bind(styles);

const Sidebar = ({ title, data, bottomline = 1, ...passProps }) => {
    return (
        <div {...passProps} className={cx('wrapper', { bottomline: bottomline })}>
            {title && <h4 className={cx('title')}>{title}</h4>}
            <div className={cx('list')}>
                {data.map((item, index) => {
                    return (
                        <Button to={item.path} index={index} text className={cx('item')}>
                            <div className={cx('item-imgbox')}>
                                <img src={item.image} alt="logo class" />
                            </div>
                            {item.name}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;
