import PageLoader from 'components/common/PageLoader';
import { Suspense } from 'react';

const Loadable = (Component: React.LazyExoticComponent<any>) =>
    function (props: any) {
        return (
            <Suspense fallback={<PageLoader />}>
                <Component {...props} />
            </Suspense>
        );
    };
export default Loadable;
