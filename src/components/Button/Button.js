import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    rounded = false,
    small = false,
    large = false,
    disabled = false,
    children,
    className,
    classItem = {},
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}) {
    let Comp = 'Button';
    const props = {
        onClick,
        ...passProps,
    };

    // Remove event listener when button disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        [classItem.menuItem]: classItem.menuItem,
        primary,
        outline,
        text,
        rounded,
        small,
        large,
        disabled,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon', { [classItem.menuIcon]: classItem.menuIcon })}>{leftIcon}</span>}
            <span className={cx('title', { [classItem.menuLabel]: classItem.menuLabel })}>{children}</span>
            {rightIcon && <span className={cx('icon', { [classItem.menuIcon]: classItem.menuIcon })}>{rightIcon}</span>}
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    text: PropTypes.bool,
    rounded: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    onClick: PropTypes.func,
};

export default Button;
