import { Helmet } from 'react-helmet-async';

interface IHeader {
    title?: string;
}

const Header = ({ title }: IHeader) => (
    <Helmet>
        <title>{`Erotas BOILERPLATE | ${title}`}</title>
    </Helmet>
);

export default Header;
