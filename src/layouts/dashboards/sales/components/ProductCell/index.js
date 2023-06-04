/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import DLAvatar from "components/DLAvatar";

function ProductCell({ image, name, orders }) {
  return (
    <DLBox display="flex" alignItems="center" pr={2}>
      <DLBox mr={2}>
        <DLAvatar src={image} alt={name} />
      </DLBox>
      <DLBox display="flex" flexDirection="column">
        <DLTypography variant="button" fontWeight="medium">
          {name}
        </DLTypography>
        <DLTypography variant="button" fontWeight="regular" color="secondary">
          <DLTypography component="span" variant="button" fontWeight="regular" color="success">
            {orders}
          </DLTypography>{" "}
          orders
        </DLTypography>
      </DLBox>
    </DLBox>
  );
}

// Typechecking props for the ProductCell
ProductCell.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  orders: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default ProductCell;
