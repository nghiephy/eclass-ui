import classNames from 'classnames/bind';

import styles from './Select.module.scss';

const cx = classNames.bind(styles);

function Select({ name = '', data = [], label = null, children, handleSelect, className, ...passProps }) {
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
            <Comp
                {...props}
                id={name}
                className={cx('form-select')}
                onChange={(e) => {
                    return handleSelect(e.target.value);
                }}
                {...passProps}
            >
                {data.map((item, index) => {
                    return (
                        <option value={item?.topicId || item?.topicId === 0 ? item.topicId : item.value} key={index}>
                            {item?.name ? item.name : item.title}
                        </option>
                    );
                })}
            </Comp>
        </div>
    );
}

export default Select;
