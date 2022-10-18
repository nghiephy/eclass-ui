import classNames from 'classnames/bind';

import styles from './Select.module.scss';

const cx = classNames.bind(styles);

function Select({ name = '', data = [], label = null, children, className, ...passProps }) {
    let Comp = 'select';
    const props = {
        name,
        ...passProps,
    };

    const classes = cx('form-group', {
        [className]: className,
    });

    return (
        <div className={classes}>
            {label && (
                <label htmlFor={name} className={cx('form-label')}>
                    {label}
                </label>
            )}
            <Comp {...props} id={name} className={cx('form-select')} {...passProps}>
                {data.map((item, index) => {
                    return (
                        <option value={item.value} key={index}>
                            {item.title}
                        </option>
                    );
                })}
            </Comp>
        </div>
    );
}

export default Select;
