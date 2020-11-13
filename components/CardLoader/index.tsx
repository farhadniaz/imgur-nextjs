import { FC } from 'react';

import Wrapper from './style';
export interface IProps {
    height: string;
}
const CardLoader: FC<IProps> = (props) => {
    const { height } = props;
    return <Wrapper data-testid="card-loader" height={height} />
}
export default CardLoader;