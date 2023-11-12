import classNames from 'classnames/bind';
import styles from './ItemStatistic.module.scss';

const cx = classNames.bind(styles);

function ItemStatistic({ data, line = true }) {
    return (
        <div className={cx('wrapper')}>
            {data.map((item, indexData) => {
                return (
                    <div key={indexData} className={cx('wrapper-item')}>
                        <h3>{item.title}</h3>
                        <div
                            className={cx('container-item')}
                            style={{ boxShadow: line ? 'rgba(17, 17, 26, 0.1) 0px 1px 0px' : 'none' }}
                        >
                            {item.detail.map((detail, indexDetail) => {
                                return (
                                    <div key={indexDetail} className={cx('container-detail')}>
                                        <p>{detail.title}</p>
                                        <h4>{detail.data}</h4>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ItemStatistic;
