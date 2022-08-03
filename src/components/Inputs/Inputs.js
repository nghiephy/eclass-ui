import classNames from 'classnames/bind';
import { useRef, useState } from 'react';

import styles from './Inputs.module.scss';
import { MyIcon } from '~/components/MyIcons';
import { IcHideEyes, IcShowEyes } from '~/components/MyIcons/regular';

const cx = classNames.bind(styles);

function Inputs({
    name = '',
    placeholder = ' ',
    type = 'text',
    label = null,
    primary = false,
    chkradio = false,
    text = false,
    disabled = false,
    children,
    className,
    classItem = {},
    icon,
    onClick,
    ...passProps
}) {
    let Comp = 'input';
    const props = {
        onClick,
        type,
        placeholder,
        name,
        ...passProps,
    };
    const [showPassword, setShowPassword] = useState(false);
    const inputPasswordRef = useRef();

    const handleShowPass = (e) => {
        setShowPassword(!showPassword);
        if (inputPasswordRef.current.type === 'password') {
            inputPasswordRef.current.type = 'text';
        } else {
            inputPasswordRef.current.type = 'password';
        }
    };

    // Remove event listener when button disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    const classes = cx('form-group', {
        [className]: className,
        [classItem.menuItem]: classItem.menuItem,
        primary,
        chkradio,
        text,
        disabled,
    });

    return (
        <div className={classes}>
            <Comp ref={inputPasswordRef} id={name} className={cx('form-input')} {...props} />
            {label && (
                <label htmlFor={name} className={cx('form-label')}>
                    {label}
                </label>
            )}
            {type === 'password' ? (
                <span
                    className={cx('icon', { [classItem.menuIcon]: classItem.menuIcon, show: showPassword })}
                    onClick={handleShowPass}
                >
                    <MyIcon className={cx('icon-hide')}>
                        <IcHideEyes />
                    </MyIcon>
                    <MyIcon className={cx('icon-show')}>
                        <IcShowEyes />
                    </MyIcon>
                </span>
            ) : (
                <span className={cx('icon', { [classItem.menuIcon]: classItem.menuIcon })}>{icon}</span>
            )}
        </div>
    );
}

Inputs.propTypes = {};

export default Inputs;
