import classNames from 'classnames/bind';
import { useRef, useState } from 'react';

import styles from './Inputs.module.scss';
import { MyIcon } from '~/components/MyIcons';
import { IcHideEyes, IcShowEyes } from '~/components/MyIcons/regular';

const cx = classNames.bind(styles);

const emptyFunction = () => {};

function Inputs({
    name = '',
    placeholder = ' ',
    type = 'text',
    label = null,
    primary = false,
    chkradio = false,
    submit = false,
    text = false,
    children,
    className,
    register = () => {
        return { ref: emptyFunction, onChange: emptyFunction };
    },
    validate = {},
    errors = {},
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
    const { ref, onChange, ...rest } = register(name, { ...validate });
    const [valueInput, setValueInput] = useState('');

    const handleShowPass = (e) => {
        setShowPassword(!showPassword);
        if (inputPasswordRef.current.type === 'password') {
            inputPasswordRef.current.type = 'text';
        } else {
            inputPasswordRef.current.type = 'password';
        }
    };

    const classes = cx('form-group', {
        [className]: className,
        [classItem.menuItem]: classItem.menuItem,
        primary,
        chkradio,
        submit,
        text,
        errors: errors[name]?.type !== undefined,
    });

    return (
        <div className={classes}>
            <Comp
                ref={(e) => {
                    ref(e);
                    inputPasswordRef.current = e;
                }}
                {...props}
                value={valueInput}
                onChange={(e) => {
                    onChange(e);
                    setValueInput(e.target.value);
                }}
                id={name}
                className={cx('form-input')}
                {...rest}
                {...passProps}
            />
            {label && (
                <label htmlFor={name} className={cx('form-label')}>
                    {label}
                </label>
            )}
            <span className={cx('message-error')}>{errors[name]?.type !== undefined && errors[name]?.message}</span>

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
