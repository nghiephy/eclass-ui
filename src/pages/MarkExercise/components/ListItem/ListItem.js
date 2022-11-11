import classNames from 'classnames/bind';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useParams } from 'react-router-dom';
import Inputs from '~/components/Inputs';

import styles from './ListItem.module.scss';
import SubmitScoreForm from './SubmitScoreForm';

const cx = classNames.bind(styles);

const ListItem = ({ title, data, bottomline = 1, resultSubmit, handleSaveScore, ...passProps }) => {
    const { postId, type } = useParams();

    return (
        <div {...passProps} className={cx('wrapper', { bottomline: bottomline })}>
            {title && <h4 className={cx('title')}>{title}</h4>}
            <div className={cx('list')}>
                {data?.map((item, index) => {
                    return (
                        <NavLink
                            to={`/exercise/mark/${item.userId}/${type}/${postId}`}
                            key={index}
                            className={(nav) => cx('item', { active: nav.isActive })}
                        >
                            <div className={cx('item-content')}>
                                <p className={cx('name')}>{item.fullName}</p>
                            </div>

                            <SubmitScoreForm handleSaveScore={handleSaveScore} resultSubmit={item} />

                            {/* <div className={cx('submit-section')}>
                                <input className={cx('grade-input')} type="number" name="score" placeholder="Điểm" />
                                <Inputs submit className={cx('button-submit-grade')} type="submit" value="Lưu" />
                            </div> */}
                        </NavLink>
                    );
                })}
            </div>
        </div>
    );
};

export default ListItem;
