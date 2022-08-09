import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { MyIcon } from '~/components/MyIcons';
import { IcCalendar, IcPenCheck, IcTodoList } from '~/components/MyIcons/regular';
import ClassItem from './components/ClassItem';

import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('quick-actions')}>
                <Button
                    to={'/todolist'}
                    className={cx('actions-item')}
                    outline
                    leftIcon={
                        <MyIcon>
                            <IcTodoList />
                        </MyIcon>
                    }
                    text
                >
                    Việc cần làm
                </Button>
                <Button
                    to={'/todolist'}
                    className={cx('actions-item')}
                    outline
                    leftIcon={
                        <MyIcon>
                            <IcPenCheck />
                        </MyIcon>
                    }
                    text
                >
                    Cần đánh giá
                </Button>
                <Button
                    to={'/todolist'}
                    className={cx('actions-item')}
                    outline
                    leftIcon={
                        <MyIcon>
                            <IcCalendar />
                        </MyIcon>
                    }
                    text
                >
                    Lịch
                </Button>
            </div>
            <h1 className={cx('title')}>Giảng dạy</h1>
            <div className={'row col'}>
                <ClassItem />
                <ClassItem />
                <ClassItem />
                <ClassItem />
            </div>
        </div>
    );
}

export default Home;
