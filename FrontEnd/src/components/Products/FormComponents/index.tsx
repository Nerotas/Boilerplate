import { ProductsForTable } from 'models/Products/Products';
import AddProductModal from './AddProductModal';
import DeactivateProductModal from './DeactivateProductModal';
import ProductsGridToolBar from './ProductsGridToolBar';
import EditTierCell from '../../common/DataGridDefaults/EditCells/EditNumberCell';

interface GirdSelector {
    row: ProductsForTable;
}

export { DeactivateProductModal, AddProductModal, ProductsGridToolBar, EditTierCell };
export type { GirdSelector };
