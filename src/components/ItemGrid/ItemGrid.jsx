import "./ItemGrid.css";

// eslint-disable-next-line no-unused-vars
const ItemGrid = ({ items, RenderItem, propName }) => {
  return (
    <div className="item-grid">
      {items.map((item) => (
        <RenderItem key={item._id} {...{ [propName]: item }} />
      ))}
    </div>
  );
};

export default ItemGrid;
