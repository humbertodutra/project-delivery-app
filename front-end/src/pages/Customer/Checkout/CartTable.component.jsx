import PropTypes from 'prop-types';
import { useContext } from 'react';
import { HomeerContext } from '../../../context/Provider';

export default function CartTable({ products, dataTest, dataTestTotal }) {
  const {
    products: {
      productsCart,
      setProductsCart,
    },
  } = useContext(HomeerContext);

  const removeItem = (index) => {
    const productToRemove = products.filter((_, a) => a !== index);
    setProductsCart(productToRemove);
  };

  const totalPrice = products.reduce((acc, curr) => acc + Number(curr.subTotal), 0);
  const total = totalPrice.toFixed(2).toString();
  const totalFormat = total.replace('.', ',');
  console.log(totalFormat);

  return (
    <section>
      { products.length === 0 ? (<h3>Nenhum produto</h3>) : (
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
              <th>Sub-total</th>
              <th>Remover Item</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={ index }>
                <td data-testid={ `${dataTest}-item-number-${index}` }>{ index + 1 }</td>
                <td data-testid={ `${dataTest}-name-${index}` }>{ p.name }</td>
                <td
                  data-testid={ `${dataTest}-quantity-${index}` }
                >
                  { p.quantity }

                </td>
                <td
                  data-testid={ `${dataTest}-unit-price-${index}` }
                >
                  { p.price.toFixed(2).toString().replace('.', ',') }

                </td>
                <td
                  data-testid={ `${dataTest}-sub-total-${index}` }
                >
                  { p.subTotal.toFixed(2).toString().replace('.', ',') }

                </td>

                <td>
                  <button
                    data-testid={ `${dataTest}-remove-${index}` }
                    type="button"
                    onClick={ () => removeItem(index) }
                  >
                    Remover
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h3
        data-testid={ `${dataTestTotal}__element-order-total-price` }
      >
        {`Total: R$${totalFormat}`}

      </h3>
    </section>
  );
}

CartTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  dataTest: PropTypes.string.isRequired,
  dataTestTotal: PropTypes.string.isRequired,
};
