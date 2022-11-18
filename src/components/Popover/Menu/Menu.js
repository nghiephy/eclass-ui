import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { Wrapper as PopoverWrapper } from '~/components/Popover';
import MenuItem from './MenuItem';
import Header from './Header';
import { useEffect, useState } from 'react';
import { MyIcon } from '~/components/MyIcons';
import { IcAngleDownSolid } from '~/components/MyIcons/solid';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({
    children,
    items = [],
    arrow,
    className,
    classItem,
    firstLoad = null,
    placement = 'top-start',
    hideOnClick = false,
    onClick,
    onChange = defaultFn,
    ...passProps
}) {
    const [history, setHistory] = useState([{ data: firstLoad ? items.slice(0, firstLoad) : items }]);
    const current = history[history.length - 1];

    const renderItem = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                    classItem={classItem}
                />
            );
        });
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const handleLoadAll = () => {
        setHistory([{ data: items }]);
    };

    const renderResult = (attrs) => (
        <div className={cx('wrapper')}>
            <div className={cx('menu-list', { [className]: className, firstLoad: firstLoad })} tabIndex="-1" {...attrs}>
                <PopoverWrapper className={cx('menu-popover')}>
                    {history.length > 1 && <Header title={current.title} onBack={handleBack} />}
                    <div className={cx('menu-scrollable')}>{renderItem()}</div>
                    {firstLoad && current.data.length < items.length && (
                        <div className={cx('load-all')} onClick={handleLoadAll}>
                            <MyIcon className={cx('load-all-btn')}>
                                <IcAngleDownSolid />
                            </MyIcon>
                        </div>
                    )}
                </PopoverWrapper>
                {arrow && (
                    <div className={cx('arrow-popover', { [placement]: placement })}>
                        <img className={cx('arrow-popover-img')} src={images.arrowPopover} alt="arrow popover" />
                    </div>
                )}
            </div>
        </div>
    );

    const handleResetToFirstPage = () => {
        return firstLoad ? setHistory([{ data: items.slice(0, firstLoad) }]) : setHistory((prev) => prev.slice(0, 1));
    };

    useEffect(() => {
        setHistory([{ data: items }]);
    }, [items]);

    return (
        <Tippy
            interactive
            hideOnClick={hideOnClick}
            delay={[0, 400]}
            offset={placement === 'top-start' ? [12, 10] : [12, 14]}
            placement={placement}
            render={(attrs) => renderResult(attrs)}
            onHide={handleResetToFirstPage}
            // onShow={(instance) => {
            //     instance.setProps({ trigger: 'click' });
            // }}
            // open={true}
            {...passProps}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
