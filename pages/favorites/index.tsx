
import { useSelector } from 'react-redux';
import { favoriteState } from '@/store/favorite/favorite.slice';
import { IProduct } from '@/store/products/products.types';
import ProductItems from '@/components/ProductItems';
import MainLayout from '@/layouts/MainLayout';

const Favorites = () => {
  const { favoriteProducts } = useSelector(favoriteState);
  return(
      <MainLayout>
          <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4 px-4">Favorite page</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 justify-items-center items-center">
              {favoriteProducts.map((item: IProduct) => (
                  <ProductItems key={item.id} productItem={item}/>
              ))}
          </div>
      </MainLayout>
  )
}
export default Favorites;