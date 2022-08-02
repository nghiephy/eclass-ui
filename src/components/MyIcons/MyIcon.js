import classNames from 'classnames/bind';
import styles from './MyIcon.module.scss';

const cx = classNames.bind(styles);

function MyIcon({ children, Icon, className, ...passProps }) {
    return (
        <div className={cx('icon-wrapper', className)} {...passProps}>
            {children}
        </div>
    );
}

export default MyIcon;
